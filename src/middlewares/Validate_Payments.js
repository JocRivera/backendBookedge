import { body, param, validationResult } from "express-validator";
import { Payments } from "../models/Payments_Model.js";

export const validatePaymentsExistence = async (id) => {
  const payments = await Payments.findByPk(id);
  if (!payments) {
    return Promise.reject("Este pago no existe");
  }
  return true;
};
export const validatePaymentNotExists = async (idReservation, idPayment) => {
  const relation = await PaymentsReservations.findOne({
    where: { idReservation, idPayments: idPayment }
  });
  if (relation) {
    return Promise.reject("Este pago ya está asociado a la reserva");
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
    .withMessage("El formato de la fecha de confirmacion debe ser (Año-Mes-Dia)"),
    body('voucher')
  .optional()
  .isString()
  .withMessage('El comprobante debe ser una ruta válida'),
body('voucherType')
  .optional()
  .isIn(['image/jpeg', 'image/png', 'application/pdf'])
  .withMessage('Formato de archivo no soportado')
];

export const updatePaymentValidation = [
  body("idPayments")
    .isInt()
    .withMessage("El ID de pago debe ser un número entero"),
  ...createPaymentValidation,
];

export const getPaymentByIdValidation = [
  body("idPayments")
    .isInt()
    .withMessage("El ID de pago debe ser un número entero"),
];

export const deletePaymentValidation = [
  body("idPayments")
    .isInt()
    .withMessage("El ID de pago debe ser un número entero"),
];

export const addPaymentsValidation = [
  body("idPayments")
    .isInt()
    .withMessage("El Id del pago debe ser un número entero")
    .custom(validatePaymentsExistence), 
];