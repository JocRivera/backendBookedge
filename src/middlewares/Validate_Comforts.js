import { body, param} from "express-validator";
import { Comforts } from "../models/Comfort_Model.js";
import { Sequelize } from 'sequelize'; // Añade esto al inicio del archivo


export const validateComfortsExistence = async (id) => {
  const comforts = await Comforts.findByPk(id);
  if (!comforts) {
    return Promise.reject("La comodidad no Existe");
  }
  return true;
};

export const validateComfortName = async (name, { req }) => {
  // Si es una actualización y el nombre no ha cambiado, no validar
  if (req.params.id && req.body.originalName === name) {
    return true;
  }

  const query = { 
    where: { 
      name,
      idComfort: { [Sequelize.Op.ne]: req.params?.id || null } 
    }
  };
  
  const comfort = await Comforts.findOne(query);
  if (comfort) {
    return Promise.reject("Ya existe otra comodidad con este nombre");
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
