import { body, param } from "express-validator";
import { Cabins } from "../models/Cabin_Model.js";
import { Sequelize } from "sequelize"; // <--- Asegúrate de importar Sequelize para Op

export const validateCabinExistence = async (id) => {
  const cabin = await Cabins.findByPk(id);
  if (!cabin) {
    return Promise.reject("La cabaña no existe");
  }
  return true;
};

const validateCabinName = async (name, { req }) => {
  const query = { where: { name } };

  const cabinIdFromParams = req.params.id;

  if (cabinIdFromParams) {
    query.where.idCabin = { [Sequelize.Op.ne]: cabinIdFromParams };
  }

  const existingCabin = await Cabins.findOne(query);
  if (existingCabin) {
    return Promise.reject("Ya existe otra cabaña con este nombre");
  }
  return true;
};

const cabinBaseValidation = [
  body("name").notEmpty().withMessage("El nombre de la cabaña es requerido"),
  body("description")
    .notEmpty()
    .withMessage("La descripción de la cabaña es requerida"),
  body("capacity")
    .isInt({ min: 3, max: 8 })
    .withMessage("La capacidad de la cabaña debe ser un número entre 3 y 8"),
  body("status")
    .optional()
    .default("En Servicio")
    .isIn(["En Servicio", "Fuera de Servicio", "Mantenimiento"])
    .withMessage(
      "El estado de la cabaña debe ser 'En Servicio', 'Fuera de Servicio' o 'En Mantenimiento'"
    ),
];

export const createCabinValidation = [
  ...cabinBaseValidation,
  body("name").custom(validateCabinName), 
];

export const updateCabinValidation = [
  param("id")
    .isInt()
    .withMessage("El ID de la cabaña debe ser un número entero")
    .bail()
    .custom(validateCabinExistence),
  ...cabinBaseValidation,
  body("name").custom(validateCabinName),
];

export const deleteCabinValidation = [
  param("id")
    .isInt()
    .withMessage("El ID de la cabaña debe ser un número entero")
    .bail()
    .custom(validateCabinExistence),
];

export const getCabinValidation = [
  param("id")
    .isInt()
    .withMessage("El ID de la cabaña debe ser un número entero")
    .bail()
    .custom(validateCabinExistence),
];
