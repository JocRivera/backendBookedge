import { body } from "express-validator";

export const validateAssignOrUpdateComforts = [
  body("idCabin")
    .notEmpty().withMessage("El idCabin es obligatorio")
    .isInt().withMessage("El idCabin debe ser un número entero"),

  body("comforts")
    // .isArray({ min:  }).withMessage("Debe incluir al menos una comodidad")
    .custom((arr) => arr.every(Number.isInteger)).withMessage("Todos los idComfort deben ser enteros")
];


export const validateAssignOrUpdateComfortsToBedroom = [
  body("idBedroom")
    .notEmpty().withMessage("El idBedroom es obligatorio")
    .isInt().withMessage("El idBedroom debe ser un número entero"),

  body("comforts")
    .isArray({ min: 1 }).withMessage("Debe incluir al menos una comodidad")
    .custom((arr) => arr.every(Number.isInteger)).withMessage("Todos los idComfort deben ser enteros")
];