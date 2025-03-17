import { Users } from "../models/user_Model.js";
import {param,body} from "express-validator"
import { validateIdentificationExistence,validateEmailExistence } from "./Validate_User.js";


const authBaseValidation=[
    body("name")
    .notEmpty()
    .withMessage("El nombre no puede estar vacío")
    .isLength({ min: 3 })
    .withMessage("El nombre debe tener mínimo 3 caracteres"),

  body("email")
    .notEmpty()
    .withMessage("El correo no puede estar vacío")
    .isEmail()
    .withMessage("El correo debe ser válido"),

  body("cellphone")
    .notEmpty()
    .withMessage("El número de celular no puede estar vacío")
    .isLength({ min: 10 })
    .withMessage("El número debe tener al menos 10 caracteres"),

  body("identificationType")
    .notEmpty()
    .withMessage("El tipo de identificación es obligatorio")
    .isIn(["CC", "CE"])
    .withMessage("El tipo de identificación debe ser 'CC' o 'CE'"),

  body("identification")
    .notEmpty()
    .withMessage("La identificación no puede estar vacía")
    .isLength({ min: 5 })
    .withMessage("La identificación debe tener mínimo 5 caracteres"),

  body("password")
    .notEmpty()
    .withMessage("La contraseña no puede estar vacía")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/)
    .withMessage("Debe contener al menos una mayúscula, una minúscula, un número y un carácter especial"),

 
]


export const registerValidation=[
    ...authBaseValidation,
    body("identification").custom(validateIdentificationExistence),
    body("email").custom(validateEmailExistence)
]