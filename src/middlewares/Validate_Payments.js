import { body, param, validationResult } from "express-validator";
import { Payments } from "../models/Payments_Model.js";

export const validatePaymentsExistence = async (id) => {
  const payments = await Payments.findByPk(id);
  if (!payments) {
    return Promise.reject("Este pago no existe");
  }
  return true;
};

export const createPaymentValidation = [
  body("paymentMethod")
    .notEmpty()
    .withMessage("El metodo de pago es requerido"),
  body("paymentDate")
    .notEmpty()
    .withMessage("La fecha de pago es requerida")
    .isISO8601()
    .withMessage("El formato valido es (Año-Mes-Dia)"),
  body("amount")
    .notEmpty()
    .withMessage("El monto es requerido")
    .isFloat({ min: 0 })
    .withMessage("El monto debe ser un numero positivo"),
  body("status")
    .optional()
    .isIn(["Confirmado", "Pendiente"])
    .withMessage("El estado debe ser 'Confirmado' o 'Pendiente'"),
  body("confirmationDate")
    .optional()
    .isISO8601()
    .withMessage("El formato de la fecha de confirmacion debe ser (Año-Mes-Dia)")
];

export const updatePaymentValidation = [
  param("idPayments")
    .isInt()
    .withMessage("El ID de pago debe ser un número entero"),
  ...createPaymentValidation,
];

export const getPaymentByIdValidation = [
  param("idPayments")
    .isInt()
    .withMessage("El ID de pago debe ser un número entero"),
];

export const deletePaymentValidation = [
  param("idPayments")
    .isInt()
    .withMessage("El ID de pago debe ser un número entero"),
];

export const addPaymentsValidation = [
  param("idPayment")
    .isInt()
    .withMessage("El Id del pago debe ser un número entero")
    .custom(validatePaymentsExistence), 
];