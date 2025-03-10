import { body, param, validationResult } from "express-validator";
import { Companions } from "../models/Companions_Model.js";

export const validateCompanionExistence = async (id) => {
  const companion = await Companions.findByPk(id);
  if (!companion) {
    return Promise.reject("El acompañante no existe");
  }
  return true;
};

export const validateCompanionDocument = async (documentNumber) => {
  const companion = await Companions.findOne({ where: { documentNumber } });
  if (companion) {
    return Promise.reject("El documento del acompañante ya está registrado");
  }
  return true;
};

const companionBaseValidation = [
  body("name").notEmpty().withMessage("El nombre del acompañante es obligatorio"),
  body("documentNumber").notEmpty().withMessage("El documento del acompañante es obligatorio"),
];

export const getCompanionById = [
  param("idCompanios")
    .isInt()
    .withMessage("El ID del acompañante debe ser un número entero válido")
    .custom(validateCompanionExistence),
];

export const createCompanionValidation = [
  ...companionBaseValidation,
  body("documentNumber").custom(validateCompanionDocument),
];

export const deleteCompanionValidation = [
  param("idCompanions")
    .isInt()
    .withMessage("El ID del acompañante debe ser un número entero")
    .custom(validateCompanionExistence),
];

export const updateCompanionValidation = [
  param("idCompanions")
    .isInt()
    .withMessage("El ID del acompañante debe ser un número entero")
    .custom(validateCompanionExistence),
  body("documentNumber").custom(validateCompanionDocument),
];
