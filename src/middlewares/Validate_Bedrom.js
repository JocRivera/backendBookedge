import { body, param } from "express-validator";
import { Bedrooms } from "../models/bedrooms_Model.js";

// Validar existencia de habitación
export const validateBedroomExistence = async (id) => {
  const room = await Bedrooms.findByPk(id);
  if (!room) {
    return Promise.reject("La habitación no existe");
  }
  return true;
};

// Validar nombre único
const validateBedroomName = async (name) => {
  const room = await Bedrooms.findOne({ where: { name } });
  if (room) {
    return Promise.reject("La habitación ya existe");
  }
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

// Validación de imagen
;

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
