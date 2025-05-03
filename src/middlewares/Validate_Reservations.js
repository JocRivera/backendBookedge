import { Reservations } from "../models/Reservations_Model.js";
import { Companions } from "../models/Companions_Model.js";
import { Payments } from "../models/Payments_Model.js";
import { Plans } from "../models/Plans_Model.js";
import { Users } from "../models/user_Model.js";
import { ReservationsCompanions } from "../models/Reservations_Companions_Models.js";
import { body, param, validationResult } from "express-validator";


export const validateReservationsExistence = async (idReservation) => {
  const reservations = await Reservations.findByPk(idReservation);
  if (!reservations) {
    return Promise.reject('La reserva no existe');
  }
  return true;
};

const reservationBaseValidation = [
  body("idUser")
    .notEmpty().withMessage("El ID del usuario es obligatorio")
    .isInt().withMessage("El ID del usuario debe ser un número entero")
    .custom(async (value) => {
      const user = await Users.findByPk(value);
      if (!user) {
        throw new Error("El usuario no existe");
      }
      return true;
    }),

  body("idPlan")
    .notEmpty().withMessage("El ID del plan es obligatorio")
    .isInt().withMessage("El ID del plan debe ser un número entero")
    .custom(async (value) => {
      const plan = await Plans.findByPk(value);
      if (!plan) {
        throw new Error("El plan no existe");
      }
      return true;
    }),

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

  body("status")
    .optional()
    .isIn(["Reservado", "Confirmado", "Pendiente", "Anulado"])
    .withMessage("Estado no válido"),

];
export const createReservationValidation = [
  ...reservationBaseValidation,
];

export const updateReservationsValidation = [
  ...reservationBaseValidation,
  param("idReservation")
    .isInt()
    .withMessage("El ID de la reserva debe ser un número entero")
    .custom(validateReservationsExistence),
];

export const deletereservationsValidation = [
  param("idReservation")
    .isInt()
    .withMessage("El ID de la reserva debe ser un número entero")
    .custom(validateReservationsExistence),
];

export const getReservationsValidation = [
  param("idReservation")
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
  param("idReservation")
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
  param("idReservationsCompanions")
    .isInt()
    .withMessage("El id de la relación Reserva-Acompañante debe ser un número entero")
    .custom(validateReservationsCompanions),
];

export const deleteCompaniosValidation = [
  param("idReservationsCompanions")
    .isInt()
    .withMessage("El id de la relación Reserva-Acompañante debe ser un número entero")
    .custom(validateReservationsCompanions),
];

//Validacion para agregar los pagos
// En Validate_Reservations.js
export const addPaymentsValidation = [
  body('amount')
    .notEmpty().withMessage('El monto es obligatorio')
    .isFloat({ min: 0.01 }).withMessage('El monto debe ser un número positivo'),
    
  body('paymentMethod')
    .notEmpty().withMessage('El método de pago es obligatorio')
    .isIn(['Efectivo', 'Tarjeta', 'Transferencia']).withMessage('Método de pago no válido'),
    
  body('paymentDate')
    .optional()
    .isISO8601().withMessage('Fecha de pago inválida'),
    
  body('status')
    .optional()
    .isIn(['Pendiente', 'Confirmado', 'Anulado']).withMessage('Estado no válido')
];

//Validacion para agregar el plan
export const addPlansValidation = [
  body('idReservation')
    .notEmpty().withMessage('El ID de la reservación es obligatorio') 
    .isInt().withMessage('El ID de la reservación debe ser un número entero') 
    .custom(validateReservationsExistence),

  body('idPlan')
    .notEmpty().withMessage('El ID del plan es obligatorio') 
    .isInt().withMessage('El ID del plan debe ser un número entero') 
    .custom(async (value) => {
      const plan = await Plans.findByPk(value);
      if (!plan) {
        throw new Error('El plan no existe');
      }
      return true;
    }),
];