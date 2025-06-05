import { body, param } from "express-validator";
import { Users } from "../models/user_Model.js";

// Verificar existencia de usuario
export const validateUserExistence = async (id) => {
  const user = await Users.findByPk(id);
  if (!user) {
    return Promise.reject("El usuario no existe");
  }
  return true;
};

// Verificar existencia de identificación
export const validateIdentificationExistence = async (identification) => {
  const user = await Users.findOne({ where: { identification } });
  if (user) {
    return Promise.reject("La identificación ya está registrada");
  }
  return true;
};

// Verificar existencia de email
export const validateEmailExistence = async (email) => {
  const user = await Users.findOne({ where: { email } });
  if (user) {
    return Promise.reject("El email ya está registrado");
  }
  return true;
};

// Verificar existencia de email en edición
export const validateEmailExistenceOnUpdate = async (email, { req }) => {
  const user = await Users.findOne({ where: { email } });

  if (user && user.idUser !== parseInt(req.params.id)) {
    return Promise.reject("El email ya está registrado por otro usuario");
  }
  return true;
};

// Verificar existencia de identificación en edición
export const validateIdentificationExistenceOnUpdate = async (identification, { req }) => {
  const user = await Users.findOne({ where: { identification } });

  if (user && user.idUser !== parseInt(req.params.id)) {
    return Promise.reject("La identificación ya está registrada por otro usuario");
  }
  return true;
};


// Base de validaciones
const usersBaseValidation = [
  body("idRol")
    .notEmpty()
    .withMessage("El Usuario debe contener un Rol"),

  body("name")
    .notEmpty()
    .withMessage("El nombre no puede estar vacío")
    .isLength({ min: 3 })
    .withMessage("El nombre debe tener mínimo 3 caracteres"),

  body("email")
    .notEmpty()
    .withMessage("El correo no puede estar vacío")
    .isEmail()
    .withMessage("El correo debe ser válido"),

  body("cellphone")
    .notEmpty()
    .withMessage("El número de celular no puede estar vacío")
    .isLength({ min: 10 })
    .withMessage("El número debe tener al menos 10 caracteres"),

  body("identificationType")
    .notEmpty()
    .withMessage("El tipo de identificación es obligatorio")
    .isIn(["CC", "CE"])
    .withMessage("El tipo de identificación debe ser 'CC' o 'CE'"),

  body("identification")
    .notEmpty()
    .withMessage("La identificación no puede estar vacía")
    .isLength({ min: 5 })
    .withMessage("La identificación debe tener mínimo 5 caracteres"),

  body("status")
    .optional()
    .isBoolean()
    .withMessage("El estado debe ser un valor booleano"),
];

const passwordRequiredValidation = [
  body("password")
    .notEmpty()
    .withMessage("La contraseña no puede estar vacía")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/)
    .withMessage("Debe contener al menos una mayúscula, una minúscula, un número y un carácter especial"),
];

const passwordOptionalValidation = [
  body("password")
    .optional()
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/)
    .withMessage("Debe contener al menos una mayúscula, una minúscula, un número y un carácter especial"),
];


// Validaciones específicas
export const getUserByIdValidation = [
  param("id")
    .isInt()
    .withMessage("El Id debe ser un número entero")
    .custom(validateUserExistence),
];

export const createUserValidation = [
  ...usersBaseValidation,
  ...passwordRequiredValidation,
  body("identification").custom(validateIdentificationExistence),
  body("email").custom(validateEmailExistence),
];


export const updateUserValidation = [
  ...usersBaseValidation,
  ...passwordOptionalValidation,
  param("id")
    .isInt()
    .withMessage("El ID del usuario debe ser un número entero"),
  body("identification").custom(validateIdentificationExistenceOnUpdate),
  body("email").custom(validateEmailExistenceOnUpdate),
];


export const deleteUserValidation = [
  param("id")
    .isInt()
    .withMessage("El ID del usuario debe ser un número entero"),
];

export const changeStatusUserValidation = [
  body("status")
    .optional()
    .isBoolean()
    .withMessage("El estado debe ser un booleano"),
  param("id")
    .isInt()
    .withMessage("El ID del usuario debe ser un número entero")
    .custom(validateUserExistence),
];
