import { body, param, validationResult } from "express-validator";
import { Reservations } from "../models/Reservations_Model.js";
import { Payments } from "../models/Payments_Model.js";

export const validateReservationExistence = async (reservation_id) => {
  const reservation = await Reservations.findByPk(reservation_id);
  if (!reservation) {
    return Promise.reject("Esta reserva no existe");
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
  body("confirmation_date")
    .optional()
    .isISO8601()
    .withMessage("El formato de la fecha de confirmacion debe ser (Año-Mes-Dia)"),
  body("reservationId")
    .notEmpty()
    .withMessage("El id de la reserva es requerido")
    .isInt()
    .withMessage("El ID de reserva debe ser un número entero")
    .custom(validateReservationExistence),
];

export const updatePaymentValidation = [
  param("id")
    .isInt()
    .withMessage("El ID de pago debe ser un número entero"),
  ...createPaymentValidation,
];

export const getPaymentByIdValidation = [
  param("id")
    .isInt()
    .withMessage("El ID de pago debe ser un número entero"),
];

export const deletePaymentValidation = [
  param("id")
    .isInt()
    .withMessage("El ID de pago debe ser un número entero"),
];

export const getPaymentByReservationIdValidation = [
  param("reservation_id")
    .isInt()
    .withMessage("El ID de la reserva debe ser un número entero"),
];