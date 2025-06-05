import { body, param } from "express-validator";
import {Plans} from "../models/Plans_Model.js";

const validatePlanExistence = async (id) => {
    const plan = await Plans.findByPk(id);
    if (!plan) {
        return Promise.reject("El plan no existe");
    }
}

const validateUniquePlanName = async (name) => {
    const plan = await Plans.findOne({ where: { name } });
    if (plan) {
        return Promise.reject("El plan ya existe");
    }
}

const planBaseValidation = [
    body("name").isLength({ min: 3 }).withMessage("El nombre debe tener al menos 3 caracteres"),
    body("description").isLength().withMessage("La descripción no puede estar vacía"),
    body("salePrice").isInt().withMessage("El precio de venta debe ser un número entero"),
    body("status").default(true).isBoolean().withMessage("El estado debe ser un booleano"),
];

export const createPlanValidation = [
    ...planBaseValidation,
    body("name").custom(validateUniquePlanName),
];

export const updatePlanValidation = [
    ...planBaseValidation,
    param("id").isInt().withMessage("El id del plan debe ser un número entero").custom(validatePlanExistence),
];

export const deletePlanValidation = [
    param("id").isInt().withMessage("El id del plan debe ser un número entero").custom(validatePlanExistence),
];

export const getPlanByIdValidation = [
    param("id").isInt().withMessage("El id del plan debe ser un número entero").custom(validatePlanExistence),
];