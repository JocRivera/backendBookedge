import { body } from "express-validator";

export const validateAssignOrUpdateComforts = [
  body("idCabin")
    .notEmpty().withMessage("El idCabin es obligatorio")
    .isInt().withMessage("El idCabin debe ser un número entero"),

  body("comforts")
    // .isArray({ min:  }).withMessage("Debe incluir al menos una comodidad")
    .custom((arr) => arr.every(Number.isInteger)).withMessage("Todos los idComfort deben ser enteros")
];
