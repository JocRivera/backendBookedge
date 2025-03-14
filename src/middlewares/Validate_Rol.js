import { body, param, validationResult } from "express-validator";
import { Roles } from "../models/Roles_Model.js";

const validateRolExistence = async (id) => {
    const rol = await Roles.findByPk(id);
    if (!rol) {
        return Promise.reject("El rol no existe");
    }
}

const validateUniqueRolName = async (name) => {
    const rol = await Roles.findOne({ where: { name } });
    if (rol) {
        return Promise.reject("El rol ya existe");
    }
}

const rolBaseValidation = [
    body("name").isLength({ min: 3 }).withMessage("El nombre debe tener al menos 3 caracteres")
        .matches(/^[a-zA-Z\s]+$/).withMessage("El nombre solo puede contener letras y espacios"),
    body("status").default(true).isBoolean().withMessage("El estado debe ser un booleano"),
];

export const createRolValidation = [
    ...rolBaseValidation,
    body("name").custom(validateUniqueRolName),
];

export const updateRolValidation = [
    ...rolBaseValidation,
    param("id").isInt().withMessage("El id del rol debe ser un número entero").custom(validateRolExistence),
];

export const deleteRolValidation = [
    param("id").isInt().withMessage("El id del rol debe ser un número entero").custom(validateRolExistence),
];

export const getRolByIdValidation = [
    param("id").isInt().withMessage("El id del rol debe ser un número entero").custom(validateRolExistence),
];

