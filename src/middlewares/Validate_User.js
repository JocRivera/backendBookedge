import { body, param } from "express-validator";
import { Users } from "../models/user_Model.js";

export const validateUserExistence = async (id) => {
  const user = await Users.findByPk(id);
  if (!user) {
    return Promise.reject("El usuario no existe");
  }
  return true;
};

export const validateDocumentExistence = async (document) => {
  const documents = await Users.findOne({ where: { document } });
  if (documents) {
    return Promise.reject("El documento del usuario existe");
  }
  return true;
};

export const validateEmailExistence = async (email) => {
  const emails = await Users.findOne({ where: { email } });
  if (emails) {
    return Promise.reject("El email ya se encuentra registrado");
  }
  return true;
};

const usersBaseValidation = [
  body("idRol")
    .notEmpty()
    .withMessage("El Usuario debe contener un Rol"),
  
  body("name")
    .notEmpty()
    .withMessage("El nombre no puede estar vacío")
    .isLength({ min: 3 })
    .withMessage("El nombre debe tener mínimo 3 caracteres"),
  
  body("email")
    .notEmpty()
    .withMessage("El correo no puede estar vacío")
    .isEmail()
    .withMessage("El correo debe ser un correo válido"),
  
  body("phone")
    .notEmpty()
    .withMessage("El número de teléfono no puede estar vacío")
    .isLength({ min: 10 })
    .withMessage("El número debe tener mínimo 10 caracteres"),
  
  body("document")
    .notEmpty()
    .withMessage("El documento no puede estar vacío")
    .isLength({ min: 5 })
    .withMessage("El documento debe tener mínimo 5 caracteres"),
  
  body("password")
    .notEmpty()
    .withMessage("La contraseña no puede estar vacía")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/)
    .withMessage("Debe contener al menos una mayúscula, una minúscula, un número y un carácter especial"),

  body("State")
    .optional()
    .default("Activo")
    .isIn(["Activo", "Inactivo"])
    .withMessage("El estado del usuario debe ser 'Activo' o 'Inactivo'"),
];

export const getUserByIdValidation = [
  param("id")
    .isInt()
    .withMessage("El Id debe ser un número entero")
    .custom(validateUserExistence),
];

export const createUserValidation = [
  ...usersBaseValidation,
  body("document").custom(validateDocumentExistence),
  body("email").custom(validateEmailExistence),
];

export const updateUserValidation = [
  ...usersBaseValidation,
  param("id")
    .isInt()
    .withMessage("El ID del usuario debe ser un número entero"),
  body("document").custom(validateDocumentExistence),
  body("email").custom(validateEmailExistence),
];

export const deleteUserValidation = [
  param("id")
    .isInt()
    .withMessage("El ID del usuario debe ser un número entero"),
];

export const changeStatusUserValidation = [
  body("State")
  .optional()
  .default("Activo")
  .isIn(["Activo", "Inactivo"])
  .withMessage("El estado del usuario debe ser 'Activo' o 'Inactivo'"),
  param("id").isInt().withMessage("El ID del usuario debe ser un Número entero"),
  param("id").custom(validateUserExistence),
]