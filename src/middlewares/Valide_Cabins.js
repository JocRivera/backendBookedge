import { body, param } from "express-validator";
import { Cabins } from "../models/Cabin_Model.js";


export const validateCabinExistence = async (id) => {
  const cabin = await Cabins.findByPk(id);
  if (!cabin) {
    return Promise.reject("La cabaña no existe");
  }
  return true;
};

const validateCabinName = async (name,{req}) => {
  const query = { where: { name } };
    
    // Si es una actualización, excluir la habitación actual de la validación
    if (req.params.id) {
      query.where.idCabin = { [Sequelize.Op.ne]: req.params.id };
    }
    
    const cabin = await Cabins.findOne(query);
    if (cabin) {
      return Promise.reject("Ya existe otra habitación con este nombre");
    }
    return true;
};

const cabinBaseValidation = [
  body("name").notEmpty().withMessage("El nombre de la cabaña es requerido"),
  body("description")
    .notEmpty()
    .withMessage("La descripción de la cabaña es requerida"),
  body("capacity")
    .isInt({ min: 3, max: 7 })
    .withMessage("La capacidad de la cabaña debe estar entre 3 y 7 personas"),
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
    .custom(validateCabinExistence), 
  ...cabinBaseValidation,
  ];



export const deleteCabinValidation = [
  param("id")
    .isInt()
    .withMessage("El ID de la cabaña debe ser un número entero")
    .custom(validateCabinExistence),
];

export const getCabinValidation = [
  param("id")
    .isInt()
    .withMessage("El ID de la cabaña debe ser un número entero")
    .custom(validateCabinExistence),
];










