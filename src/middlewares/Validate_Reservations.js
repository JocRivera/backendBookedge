import { Reservations } from "../models/Reservations_Model.js";
import { Companions } from "../models/Companions_Model.js";
import { Payments } from "../models/Payments_Model.js";
import { ReservationsCompanions } from "../models/Reservations_Companions_Models.js";
import { body, param, validationResult } from "express-validator";


export const validateReservationsExistence = async (idReservation) => {
  const reservations = await Reservations.findByPk(idReservation);
  if (!reservations) {
    return Promise.reject('La reserva no existe');
  }
  return true;
};

export const validateReservationsName = async (nameClient) => {
  const reservations = await Reservations.findOne({ where: { nameClient } });
  if (reservations) {
    return Promise.reject('La reserva ya existe');
  }
  return true;
}

const reservationBaseValidation = [
  body("nameClient")
    .notEmpty().withMessage("El nombre del cliente es obligatorio")
    .isString().withMessage("El nombre del cliente debe ser un texto"),
  body("documentType")
    .notEmpty().withMessage("El tipo de documento es obligatorio")
    .isIn(["Cédula de ciudadanía", "Cédula de extranjería", "Pasaporte"])
    .withMessage("Tipo de documento no válido"),


  body("plan")
    .notEmpty().withMessage("El plan es obligatorio")
    .isIn(["Día de sol", "Empresarial", "Romántico", "Pasadía Cumpleaños", "Amanecida"])
    .withMessage("Plan no válido"),

  body("startDate")
    .notEmpty().withMessage("La fecha de inicio es obligatoria")
    .isISO8601().withMessage("La fecha de inicio debe tener un formato válido (Año-Mes-Dia)")
    .custom((value) => {
      const currentDate = new Date();
      const selectedDate = new Date(value);
      if (selectedDate < currentDate) {
        throw new Error("La fecha de inicio no puede ser anterior a la fecha actual");
      }
      return true;
    }),

  body("endDate")
    .notEmpty().withMessage("La fecha de fin es obligatoria")
    .isISO8601().withMessage("La fecha de fin debe tener un formato válido (Año-Mes-Dia)")
    .custom((value, { req }) => {
      const startDate = new Date(req.body.startDate);
      const endDate = new Date(value);
      if (endDate < startDate) {
        throw new Error("La fecha de fin no puede ser anterior a la fecha de inicio");
      }
      return true;
    }),


  body("price")
    .notEmpty().withMessage("El precio es obligatorio")
    .isFloat({ min: 0 }).withMessage("El precio debe ser un número positivo"),

  body("status")
    .optional()
    .isIn(["Reservado", "Confirmado", "Pendiente", "Anulado"])
    .withMessage("Estado no válido"),
];

export const createReservationValidation = [
  ...reservationBaseValidation,
  body("nameClient").custom(validateReservationsName),
];

export const updateReservationsValidation = [
  ...reservationBaseValidation,
  param("id")
    .isInt()
    .withMessage("El ID de la reserva debe ser un número entero")
    .custom(validateReservationsExistence),
  body("nameClient").custom(validateReservationsName),
];

export const deletereservationsValidation = [
  param("id")
    .isInt()
    .withMessage("El ID de la reserva debe ser un número entero")
    .custom(validateReservationsExistence),
];

export const getReservationsValidation = [
  param("id")
    .isInt()
    .withMessage("El ID de la reserva debe ser un número entero")
    .custom(validateReservationsExistence),
];

export const changeStateReservationsValidation = [
  body("status")
    .isIn(["Reservado", "Confirmado", "Pendiente", "Anulado"])
    .withMessage(
      "El estado de la reserva debe ser 'Reservado', 'Confirmado', 'Pendiente' o 'Anulado'"
    ),
  param("id")
    .isInt()
    .withMessage("El ID de la reserva debe ser un número entero")
    .custom(validateReservationsExistence),
];


//VALIDACIONES PUT , DELETE, POST ADDCOMPANIONS

export const validateReservationsCompanions = async (idReservationsCompanions) => {
  const relation = await ReservationsCompanions.findByPk(idReservationsCompanions);
  console.log("Buscando relación con ID:", idReservationsCompanions); // Depuración
  if (!relation) {
    return Promise.reject("No hay relaciones de Reservas y Acompañantes");
  }
  return true;
};
export const validateCompanionsNotExists = async (idReservation, idCompanions) => {
  const reservationsCompanions = await ReservationsCompanions.findOne({
    where: { idReservation, idCompanions }
  });
  if (reservationsCompanions) {
    return Promise.reject("La Reserva ya contiene este acompañante");
  }
  return true;
};

export const addCompanionValidation = [
  param("idReservation")
    .isInt()
    .withMessage("El id de la reserva debe ser un número entero")
    .custom(validateReservationsExistence),
  param("idCompanion")
    .isInt()
    .withMessage("El id del acompañante debe ser un número entero")
    .custom(async (value) => {
      const companion = await Companions.findByPk(value);
      if (!companion) {
        throw new Error("El acompañante no existe");
      }
      return true;
    }),
];

export const updateCompanionsValidation = [
  ...reservationBaseValidation,
  param("idReservationsCompanions").isInt().withMessage("El id de la relación Reserva-Acompañante debe ser un número entero").custom(validateReservationsCompanions),
];

export const deleteCompaniosValidation = [
  param("idReservationsCompanions")
    .isInt()
    .withMessage("El id de la relación Reserva-Acompañante debe ser un número entero")
    .custom(validateReservationsCompanions),
];

//Validacion para agregar los pagos
export const addPaymentsValidation = [
  param('idReservation')
  .isInt()
  .withMessage('El Id de la reserva debe ser un numero entero')
  .custom(validateReservationsExistence),
  param('idPayment')
  .isInt()
  .withMessage('El Id del pago debe ser un numero entero')
  .custom(async (value) => {
      const payment = await Payments.findByPk(value);
      if (!payment){
        throw new Error('El pago no existe')
      }
      return true; 
    }
  ),
]