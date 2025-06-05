
import { body, param } from "express-validator";
import { Users } from "../models/user_Model.js"; 
/**
 * Verifica si un email ya existe para OTRO usuario durante una actualización.
 * Si el email es el mismo que el usuario ya tiene, se considera válido.
 */
export const validateEmailExistenceOnUpdate = async (email, { req }) => {
  // El campo 'email' en el perfil normalmente es de solo lectura o se actualiza con un flujo especial.
  // Sin embargo, si se permite cambiar y se envía, debemos validar.
  // Esta validación se activa si express-validator (.isEmail()) considera que es un email válido.

  if (!email) {
   
    return true;
  }

  const userIdBeingUpdated = parseInt(req.params.id, 10);

  // Verificamos que el ID del parámetro sea un número válido.
  // Esta validación también la tienes en param("id").isInt(), pero una doble capa no está de más.
  if (isNaN(userIdBeingUpdated)) {
    // Esto es un error de sistema más que de validación de usuario, pero lo atrapamos.
    return Promise.reject("ID de usuario en la ruta es inválido.");
  }
  
  // Buscamos si algún usuario (distinto al que se está actualizando) ya tiene este email.
  const userWithThisEmail = await Users.findOne({ where: { email } });

  if (userWithThisEmail && userWithThisEmail.idUser !== userIdBeingUpdated) {
    // Se encontró otro usuario con este email.
    return Promise.reject("El email ya está registrado por otro usuario.");
  }

 
  return true;
};


export const validateIdentificationExistenceOnUpdate = async (identification, { req }) => {
  if (!identification) {
   
    return true;
  }

  const userIdBeingUpdated = parseInt(req.params.id, 10);

  if (isNaN(userIdBeingUpdated)) {
    return Promise.reject("ID de usuario en la ruta es inválido.");
  }

  const userWithThisIdentification = await Users.findOne({ where: { identification } });

  if (userWithThisIdentification && userWithThisIdentification.idUser !== userIdBeingUpdated) {
    return Promise.reject("La identificación ya está registrada por otro usuario.");
  }
  return true;
};



export const updateProfileValidation = [
  param("id")
    .isInt().withMessage("El ID del usuario debe ser un número entero"),
    // Opcional: Podrías añadir una validación custom aquí para asegurar que el param ID
    // coincida con el req.user.idUser del token, aunque tu controlador ya lo hace.
    // Esto es para una capa de defensa adicional a nivel de validación de ruta.
    // .custom(async (id, { req }) => {
    //   if (!req.user || parseInt(id, 10) !== req.user.idUser) {
    //     return Promise.reject("No está autorizado para modificar este perfil o el ID no coincide.");
    //   }
    //   // Podrías incluso verificar si el usuario con ese ID existe aquí
    //   const user = await Users.findByPk(id);
    //   if (!user) {
    //       return Promise.reject("El usuario del perfil a actualizar no existe.");
    //   }
    //   return true;
    // }),
   
  body("name")
    .notEmpty().withMessage("El nombre no puede estar vacío")
    .isLength({ min: 3 }).withMessage("El nombre debe tener mínimo 3 caracteres"),

  body("email")
  .optional({ checkFalsy: true }) // <--- AÑADE ESTO. checkFalsy hace que "" o null también lo traten como opcional
  .isEmail().withMessage("El correo debe ser válido si se proporciona") // Se valida solo si está presente
  .custom(validateEmailExistenceOnUpdate),

  body("cellphone")
    .notEmpty().withMessage("El número de celular no puede estar vacío")
    .isLength({ min: 10, max: 10 }).withMessage("El número debe tener 10 dígitos") 
    .isNumeric().withMessage("El celular solo debe contener números"),

  body("identificationType")
    .notEmpty().withMessage("El tipo de identificación es obligatorio")
    .isIn(["CC", "CE", "TI", "NIT", "PAS"]).withMessage("Tipo de ID no válido"),

  body("identification")
    .notEmpty().withMessage("La identificación no puede estar vacía")
    .isLength({ min: 5 }).withMessage("La identificación debe tener mínimo 5 caracteres")
    .custom(validateIdentificationExistenceOnUpdate), // Llama a la función definida arriba
  
  body("eps")
    .optional({ checkFalsy: true }) // checkFalsy: true significa que "" o null se considera ausente
    .trim()
    .isLength({ min: 2, max: 50 }).withMessage("EPS debe tener entre 2 y 50 caracteres si se proporciona"),

  body("address")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ min: 5, max: 100 }).withMessage("La dirección debe tener entre 5 y 100 caracteres si se proporciona"),
  
  body("birthdate")
    .optional({ checkFalsy: true }) 
    .isISO8601().withMessage("Fecha de nacimiento no válida (formato YYYY-MM-DD)")
    .custom((value) => { 
      if (!value) return true; 
      
      const birthDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      birthDate.setHours(0, 0, 0, 0);

      if (birthDate > today) {
        throw new Error("La fecha de nacimiento no puede ser futura.");
      }
      
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      if (age < 18) { 
        throw new Error("Debes ser mayor de 18 años."); 
      }
      return true;
    }),
];