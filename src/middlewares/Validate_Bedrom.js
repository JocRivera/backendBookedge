import { body, param } from "express-validator";
import { Bedrooms } from "../models/bedrooms_Model.js";
import { BedroomsComforts } from "../models/Bedrooms_Comforts.js";
import { validateComfortsExistence } from "./Validate_Comforts.js";

// Validación de existencia de habitación
export const validateBedroomExistence = async (id) => {
  const room = await Bedrooms.findByPk(id);
  if (!room) {
    return Promise.reject("La Habitación no existe");
  }
  return true;
};

// Validación de nombre único de habitación
export const validateBedroomName = async (name) => {
  const room = await Bedrooms.findOne({ where: { name } });
  if (room) {
    return Promise.reject("La Habitación ya existe");
  }
};

// Validaciones base para la habitación
const bedroomBaseValidation = [
  body("name").notEmpty().withMessage("El nombre de la habitación es requerido"),
  body("description")
    .notEmpty()
    .withMessage("La descripción de la habitación es requerida"),
  body("capacity")
    .isInt({ min: 1, max: 2 })
    .withMessage("La capacidad de la habitación debe estar entre 1 y 2 personas"),
  body("status")
    .optional()
    .default("En Servicio")
    .isIn(["En Servicio", "Fuera de Servicio", "Mantenimiento"])
    .withMessage(
      "El estado de la habitación debe ser 'En Servicio', 'Fuera de Servicio' o 'Mantenimiento'"
    ),
];

// Validación de imagen
const imageValidation = body("imagen").custom((value, { req }) => {
  if (!req.file) {
    throw new Error("La imagen de la habitación es requerida");
  }
  return true;
});

// Validaciones para crear habitación
export const createBedroomValidation = [
  ...bedroomBaseValidation,
  imageValidation,
  body("name").custom(validateBedroomName),
];

// Validaciones para actualizar habitación
export const updateBedroomValidation = [
  ...bedroomBaseValidation,
  imageValidation,
  param("id")
    .isInt()
    .withMessage("El ID de la habitación debe ser un número entero")
    .custom(validateBedroomExistence)
    .custom(validateBedroomName)
];

// Validaciones para eliminar habitación
export const deleteBedroomValidation = [
  param("id")
    .isInt()
    .withMessage("El ID de la habitación debe ser un número entero")
    .custom(validateBedroomExistence),
];

// Validaciones para obtener habitación
export const getBedroomValidation = [
  param("id")
    .isInt()
    .withMessage("El ID de la Habitación debe ser un número entero")
    .custom(validateBedroomExistence),
];


// Validaciones para añadir comodidad a la habitación
export const validateComfortNotExists = async (idRoom, idComfort) => {
  const bedroomComforts = await BedroomsComforts.findOne({
    where: { idRoom, idComfort },
  });
  if (bedroomComforts) {
    return Promise.reject("La habitación ya contiene esta comodidad");
  }
  return true;
};

// Validaciones base para las comodidades
const bedroomComfortBaseValidation = [
  body("description")
  .notEmpty()
  .withMessage("La descripción no puede estar vacía"),
body("dateEntry")
  .optional()
  .isDate()
  .withMessage("Debe ser una fecha válida")
  .default(Date.now),
];

// Validación para añadir comodidad a la habitación
export const addComfortValidation = [
  ...bedroomComfortBaseValidation,
  body("idRoom")
    .isInt()
    .withMessage("El id de la habitación debe ser un número entero")
    .custom(validateBedroomExistence),
  body("idComfort")
    .isInt()
    .withMessage("El id de la comodidad debe ser un número entero")
    .custom(validateComfortsExistence),
  body().custom(async (value) => {
    await validateComfortNotExists(value.idRoom, value.idComfort);
  }),
];

// Validación para actualizar la comodidad de la habitación
export const updateComfortValidation = [
  ...bedroomComfortBaseValidation,
  param("idRoomComforts")
    .isInt()
    .withMessage("El id de la relación habitación-comodidad debe ser un número entero"),
  body("idRoom")
    .optional()
    .isInt()
    .withMessage("El id de la habitación debe ser un número entero")
    .custom(validateBedroomExistence),
  body("idComfort")
    .optional()
    .isInt()
    .withMessage("El id de la comodidad debe ser un número entero"),
];

// Validación para eliminar la comodidad de la habitación
export const deleteComfortValidation = [
  param("idRoomComforts")
    .isInt()
    .withMessage("El id de la relación habitación-comodidad debe ser un número entero")
];
