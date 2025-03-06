import { body, param, validationResult } from "express-validator";
import { Comforts } from "../models/Comfort_Model.js";

export const validateComfortsExistence = async (id) => {
  const comforts = await Comforts.findByPk(id);
  if (!comforts) {
    return Promise.reject("La comodidad no Existe");
  }
  return true;
};

export const validateComfortName = async (name) => {
  const comforts = await Comforts.findOne({ where: { name } });
  if (comforts) {
    return Promise.reject("La comodidad ya existe");
  }
  return true;
};
const comfortBaseValidation = [
  body("name")
    .notEmpty()
    .withMessage("El nombre de la comodidad es obligatorio"),
];

export const getComfortById =[
  param("id")
  .isInt()
  .withMessage("El ID de la comodidad debe ser un número entero valido")
  .custom(validateComfortsExistence)
]
export const createComfortsValidation = [
  ...comfortBaseValidation,
    body("name").custom(validateComfortName),
];

export const deleteComfortValidation = [
  param("id")
    .isInt()
    .withMessage("El ID de la comodidad debe ser un número entero")
    .custom(validateComfortsExistence),
];



export const updateComfortValidaiton = [
  param("id")
    .isInt()
    .withMessage("El ID de la comodidad debe ser un Número entero")
    .custom(validateComfortsExistence),
  body("name").custom(validateComfortName),
];
