import express from "express";
import {
  getAllReservationsController,
  getReservationsByIdController,
  createReservationsController,
  updateReservationsController,
  addCompanions,
  addPayments,
  updateCompanion,
  deleteCompanions,
  changeStatusReservationsController,
} from "../controllers/Reservations_Controllers.js";

import {
  createReservationValidation,
  updateReservationsValidation,
  getReservationsValidation,
  changeStateReservationsValidation,
  addCompanionValidation,
  addPaymentsValidation,
  updateCompanionsValidation,
  deleteCompaniosValidation
} from '../middlewares/Validate_Reservations.js';

const router = express.Router();

// Rutas para las reservas
router.get("/", getAllReservationsController);
router.get("/:id", getReservationsValidation, getReservationsByIdController);
router.post("/", createReservationValidation, createReservationsController);
router.put("/:id", updateReservationsValidation, updateReservationsController);
router.patch("/:id/status", changeStateReservationsValidation, changeStatusReservationsController);

//Ruta para obtener una reserva con sus acompañantes y agregar pagos
router.get("/:id/companions", getReservationsValidation, getReservationsByIdController);

//Ruta para agregar un acompañante
router.post("/:idReservation/companions/:idCompanion", addCompanionValidation, addCompanions);

//Ruta para agregar pagos
router.post("/:idReservation/payments/:idPayments", addPaymentsValidation, addPayments);

//Ruta para actualizar un acompañante
router.put("/companions/:id/ReservationsCompanions", updateCompanionsValidation, updateCompanion);

//Ruta para eliminar un acompañante
router.delete("/companions/:idReservationsCompanions/ReservationsCompanions", deleteCompaniosValidation, deleteCompanions);
export default router;
