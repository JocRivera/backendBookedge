import { body, param } from "express-validator";
import { Users } from "../models/User_Model";

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
    return Promise.reject("El documento del usuario  existe");
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
  body("name")
    .notEmpty()
    .withMessage("El nombre no puede estar vacio")
    .isLength({ min: 3 })
    .withMessage("el nombre debe tener minimo 3 caracteres"),
  body("email")
    .notEmpty()
    .withMessage("El correo no puede estar vacio")
    .isEmail()
    .withMessage("El correo debe ser un correo valido"),
  body("phone")
    .notEmpty()
    .withMessage("El número de teléfono no puede estar vacio")
    .isLength({ min: 10 })
    .withMessage("El número debe tener minimo 10 caracteres"),
  body("document")
    .notEmpty()
    .withMessage("El documento no puede estar vacio")
    .isLength({ min: 5 })
    .withMessage("El documento debe tener minimo 5 caracteres"),
  body("password").notEmpty(),
  isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    .withMessage(
      "La contraseña debe contener al menos una letra mayúscula, una minúscula, un número y un carácter especial"
    ),
    body("State")
    .optional()
    .default("Activo")
    .isInt(["Activo","Inactivo"])
    .withMessage("El estado del usuario debe ser Activo o Inactivo")
];

const createUserValidation = [
  ...usersBaseValidation,
  body("document").custom(validateDocumentExistence),
  body("email").custom(validateEmailExistence),
];

const updateUserValidation = [
  ...usersBaseValidation,
  param("id")
    .isInt()
    .withMessage("El ID del usuario deber se un número entero"),
  body("document").custom(validateDocumentExistence),
  body("email").custom(validateEmailExistence),
];

export const deleteUserValidation =[
    param(id)
    .isInt()
    .withMessage("El ID del usuario deber ser un número entero")
]