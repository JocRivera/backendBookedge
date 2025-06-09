import { body, param } from "express-validator";
import { Bedrooms } from "../models/Bedrooms_Model.js"; 
import { Sequelize } from "sequelize"; 

export const validateBedroomExistence = async (id) => {
  const room = await Bedrooms.findByPk(id);
  if (!room) {
    return Promise.reject("La habitación no existe");
  }
  return true;
};

const validateBedroomName = async (name, { req }) => {
  const query = { where: { name } };
  const roomIdFromParams = req.params.id;

  if (roomIdFromParams) {
    query.where.idRoom = { [Sequelize.Op.ne]: roomIdFromParams }; 
  }
  
  const existingRoom = await Bedrooms.findOne(query);
  if (existingRoom) {
    return Promise.reject("Ya existe otra habitación con este nombre");
  }
  return true;
};

const bedroomBaseValidation = [
  body("name")
    .notEmpty().withMessage("El nombre de la habitación es requerido")
    .trim(), 
  body("description")
    .notEmpty().withMessage("La descripción es requerida")
    .trim(),
  body("capacity")
    .isInt({ min: 1, max: 4 }) 
    .withMessage("La capacidad debe ser un número entre 1 y 4 personas"), 
  body("status")
    .optional() 
    .default("En Servicio") 
    .isIn(["En Servicio", "Fuera de Servicio", "Mantenimiento"])
    .withMessage("El estado de la habitación debe ser 'En Servicio', 'Fuera de Servicio' o 'Mantenimiento'"), // Mensaje más descriptivo
 
];

// Crear habitación
export const createBedroomValidation = [
  ...bedroomBaseValidation,
  body("name").custom(validateBedroomName), 
  body("status").default("En Servicio"), 
];

export const updateBedroomValidation = [
  param("id")
    .isInt().withMessage("El ID de la habitación debe ser un número entero") 
    .bail() 
    .custom(validateBedroomExistence),
  ...bedroomBaseValidation, 
  body("name").custom(validateBedroomName), 
];

export const deleteBedroomValidation = [
  param("id")
    .isInt().withMessage("El ID de la habitación debe ser un número entero")
    .bail()
    .custom(validateBedroomExistence),
];

// Obtener habitación
export const getBedroomValidation = [
  param("id")
    .isInt().withMessage("El ID de la habitación debe ser un número entero")
    .bail()
    .custom(validateBedroomExistence),
];
