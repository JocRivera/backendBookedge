import express from "express";
import {
  getAllReservationsController,
  getReservationsByIdController,
  createReservationsController,
  updateReservationsController,
  addCompanions,
  addPayments,
  addPlans,
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
  addPlansValidation,
  updateCompanionsValidation,
  deleteCompaniosValidation
} from '../middlewares/Validate_Reservations.js';
import { authorize } from "../middlewares/RolesPermissionAuth.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
const router = express.Router();

// Rutas para las reservas
router.get("/",verifyToken,authorize(["view_reservations"]), getAllReservationsController);
router.get("/:idReservation", getReservationsValidation, authorize(["view_reservations"]), getReservationsByIdController);
router.post("/", createReservationValidation,verifyToken,authorize(["create_reservations"]), createReservationsController);
router.put("/:id", updateReservationsValidation,verifyToken,authorize(["edit_reservations"]), updateReservationsController);
router.patch("/:id/status", changeStateReservationsValidation,verifyToken,authorize(["change_status_reservations"]), changeStatusReservationsController);

//Ruta para obtener una reserva con sus acompañantes y agregar pagos
router.get("/:id/companions", getReservationsValidation, getReservationsByIdController);

//Ruta para agregar un acompañante
router.post("/:idReservation/companions/:idCompanion", addCompanionValidation, addCompanions);

//Ruta para agregar pagos
router.post("/Reservationpayments",addPaymentsValidation, addPayments);

//Ruta para agregar plan
router.post("/Reservationplans", addPlansValidation, addPlans);

//Ruta para actualizar un acompañante
router.put("/companions/:id/ReservationsCompanions", updateCompanionsValidation, updateCompanion);

//Ruta para eliminar un acompañante
router.delete("/companions/:idReservationsCompanions/ReservationsCompanions", deleteCompaniosValidation, deleteCompanions);
export default router;
