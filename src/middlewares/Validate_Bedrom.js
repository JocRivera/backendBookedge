import { body, param } from "express-validator";
import { Bedrooms } from "../models/bedrooms_Model.js";
import { BedroomsComforts } from "../models/Bedrooms_Comforts.js";

export const validateBedroomExistence = async (id) => {
  const room = await Bedrooms.findByPk(id);
  if (!room) {
    return Promise.reject("La Habitación no existe");
  }
  return true;
};

export const validateBedroomName = async (name) => {
  const room = await Bedrooms.findOne({ where: { name } });
  if (room) {
    return Promise.reject("La Habitación ya existe");
  }
  return true;
};

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

const imageValidation = body("imagen").custom((value, { req }) => {
  if (!req.file) {
    throw new Error("La imagen de la habitación es requerida");
  }
  return true;
});

export const createBedroomValidation = [
  ...bedroomBaseValidation,
  imageValidation,
  body("name").custom(validateBedroomName),
];

export const updateBedroomValidation = [
  ...bedroomBaseValidation,
  imageValidation,
  param("id")
    .isInt()
    .withMessage("El ID de la habitación debe ser un número entero")
    .custom(validateBedroomExistence),
  body("name").custom(validateBedroomName),
];

export const deleteBedroomValidation = [
  param("id")
    .isInt()
    .withMessage("El ID de la habitación debe ser un número entero")
    .custom(validateBedroomExistence),
];

export const getBedroomValidation = [
  param("id")
    .isInt()
    .withMessage("El ID de la Habitación debe ser un número entero")
    .custom(validateBedroomExistence),
];

export const changeStateBedroomValidation = [
  body("status")
    .isIn(["En Servicio", "Fuera de Servicio", "Mantenimiento"])
    .withMessage(
      "El estado de la habitación debe ser 'En Servicio', 'Fuera de Servicio' o 'Mantenimiento'"
    ),
  param("id")
    .isInt()
    .withMessage("El ID de la habitación debe ser un número entero")
    .custom(validateBedroomExistence),
];

// Validaciones para Comodidades
export const validateComfortNotExists = async (idBedroom, idComfort) => {
  const bedroomComforts = await BedroomsComforts.findOne({
    where: { idBedroom, idComfort },
  });
  if (bedroomComforts) {
    return Promise.reject("La habitación ya contiene esta comodidad");
  }
  return true;
};

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

export const addComfortValidation = [
  ...bedroomComfortBaseValidation,
  body("idBedroom")
    .isInt()
    .withMessage("El id de la habitación debe ser un número entero")
    .custom(validateBedroomExistence),
  body("idComfort")
    .isInt()
    .withMessage("El id de la comodidad debe ser un número entero"),
  body().custom(async (value) => {
    await validateComfortNotExists(value.idBedroom, value.idComfort);
  }),
];

export const updateComfortValidation = [
  ...bedroomComfortBaseValidation,
  param("idBedroomComfort")
    .isInt()
    .withMessage("El id de la relación habitación-comodidad debe ser un número entero"),
  body("idBedroom")
    .optional()
    .isInt()
    .withMessage("El id de la habitación debe ser un número entero")
    .custom(validateBedroomExistence),
  body("idComfort")
    .optional()
    .isInt()
    .withMessage("El id de la comodidad debe ser un número entero"),
];

export const deleteComfortValidation = [
  param("idBedroomComfort")
    .isInt()
    .withMessage("El id de la relación habitación-comodidad debe ser un número entero"),
];
