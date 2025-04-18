import { body, param, validationResult } from "express-validator";
import { Services } from "../models/Services_Model.js";

const validateServiceExistence = async (id) => {
    const service = await Services.findByPk(id);
    if (!service) {
        return Promise.reject("El servicio no existe");
    }
}

const validateUniqueServiceName = async (name) => {
    const service = await Services.findOne({ where: { name } });
    if (service) {
        return Promise.reject("El servicio ya existe");
    }
}

const serviceBaseValidation = [
    body("name").isLength({ min: 3 }).withMessage("El nombre debe tener al menos 3 caracteres")
        .matches(/^[a-zA-Z\s]+$/).withMessage("El nombre solo puede contener letras y espacios"),
    body("status").default(true).isBoolean().withMessage("El estado debe ser un booleano"),
];

export const validateService = [
    ...serviceBaseValidation,
    body("name").custom(validateUniqueServiceName),
];

export const updateServiceValidation = [
    ...serviceBaseValidation,
    param("id").isInt().withMessage("El id del servicio debe ser un número entero").custom(validateServiceExistence),

];

export const deleteServiceValidation = [
    param("id").isInt().withMessage("El id del servicio debe ser un número entero").custom(validateServiceExistence),
];

export const getServiceByIdValidation = [
    param("id").isInt().withMessage("El id del servicio debe ser un número entero").custom(validateServiceExistence),
];

// export const validateServiceMiddleware = (req, res, next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }
//     next();
// };