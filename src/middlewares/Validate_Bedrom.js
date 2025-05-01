import { body, param } from "express-validator";
import { Bedrooms } from "../models/bedrooms_Model.js";
import { Sequelize } from "sequelize";

// Validar existencia de habitación
export const validateBedroomExistence = async (id) => {
  const room = await Bedrooms.findByPk(id);
  if (!room) {
    return Promise.reject("La habitación no existe");
  }
  return true;
};

const validateBedroomName = async (name, { req }) => {
  const query = { where: { name } };
  
  // Si es una actualización, excluir la habitación actual de la validación
  if (req.params.id) {
    query.where.idRoom = { [Sequelize.Op.ne]: req.params.id };
  }
  
  const room = await Bedrooms.findOne(query);
  if (room) {
    return Promise.reject("Ya existe otra habitación con este nombre");
  }
  return true;
};

// Validaciones base
const bedroomBaseValidation = [
  body("name").notEmpty().withMessage("El nombre de la habitación es requerido"),
  body("description")
    .notEmpty()
    .withMessage("La descripción es requerida"),
  body("capacity")
    .isInt({ min: 1, max: 2 })
    .withMessage("La capacidad debe estar entre 1 y 2 personas"),
  body("status")
    .optional()
    .default("En Servicio")
    .isIn(["En Servicio", "Fuera de Servicio", "Mantenimiento"])
    .withMessage("Estado inválido"),
];

// Crear habitación
export const createBedroomValidation = [
  ...bedroomBaseValidation,
  body("name").custom(validateBedroomName),
];

// Actualizar habitación
export const updateBedroomValidation = [
  param("id")
    .isInt()
    .withMessage("El ID debe ser un número entero")
    .custom(validateBedroomExistence),
  ...bedroomBaseValidation,
  body("name").custom(validateBedroomName), // Agregamos validación de nombre único también aquí
];

// Eliminar habitación
export const deleteBedroomValidation = [
  param("id")
    .isInt()
    .withMessage("El ID debe ser un número entero")
    .custom(validateBedroomExistence),
];

// Obtener habitación
export const getBedroomValidation = [
  param("id")
    .isInt()
    .withMessage("El ID debe ser un número entero")
    .custom(validateBedroomExistence),
];