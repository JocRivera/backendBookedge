import { body, param, validationResult } from "express-validator";
import { Companions } from "../models/Companions_Model.js";

export const validateCompanionExistence = async (id) => {
  const companion = await Companions.findByPk(id);
  if (!companion) {
    return Promise.reject("El acompañante no existe");
  }
  return true;
};

export const validateCompanionDocument = async (document) => {
  const companion = await Companions.findOne({ where: { document } });
  if (companion) {
    return Promise.reject("El documento del acompañante ya está registrado");
  }
  return true;
};

const companionBaseValidation = [
  body("name").notEmpty().withMessage("El nombre del acompañante es obligatorio"),
  body("document").notEmpty().withMessage("El documento del acompañante es obligatorio"),
];

export const getCompanionById = [
  param("id")
    .isInt()
    .withMessage("El ID del acompañante debe ser un número entero válido")
    .custom(validateCompanionExistence),
];

export const createCompanionValidation = [
  ...companionBaseValidation,
  body("document").custom(validateCompanionDocument),
];

export const deleteCompanionValidation = [
  param("id")
    .isInt()
    .withMessage("El ID del acompañante debe ser un número entero")
    .custom(validateCompanionExistence),
];

export const updateCompanionValidation = [
  param("id")
    .isInt()
    .withMessage("El ID del acompañante debe ser un número entero")
    .custom(validateCompanionExistence),
  body("document").custom(validateCompanionDocument),
];
