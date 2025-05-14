import express from "express";
import {
  getAllReservationsController,
  getReservationsByIdController,
  createReservationsController,
  updateReservationsController,
  addCompanions,
  addPaymentToReservationController,
  addPlans,
  updateCompanion,
  deleteCompanions,
  changeStatusReservationsController,
  addCabin
  
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
  deleteCompaniosValidation,
  addCabinsValidation
} from '../middlewares/Validate_Reservations.js';
import { authorize } from "../middlewares/RolesPermissionAuth.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
const router = express.Router();
// Rutas para las reservas
router.get("/", getAllReservationsController);
router.get("/:idReservation", getReservationsValidation, getReservationsByIdController);
router.post("/", createReservationValidation, createReservationsController);
router.put("/:idReservation", updateReservationsValidation, updateReservationsController);
router.patch("/:id/status", changeStateReservationsValidation, changeStatusReservationsController);

//Ruta para obtener una reserva con sus acompañantes y agregar pagos
router.get("/:idReservation/companions", getReservationsValidation, getReservationsByIdController);

//Ruta para agregar un acompañante
router.post(
  "/:idReservation/companions",
  addCompanionValidation,
  addCompanions
);

//Ruta para agregar pagos
router.post("/:idReservation/payments",addPaymentsValidation, addPaymentToReservationController);

//Ruta para agregar plan
router.post("/Reservationplans", 
  addPlansValidation, addPlans
);

//Ruta para actualizar un acompañante
router.put(
  "/:idReservation/companions/:idReservationsCompanions",
  updateCompanionsValidation,
  updateCompanion
);

//Ruta para eliminar un acompañante
router.delete("/companions/:idReservationsCompanions/ReservationsCompanions", deleteCompaniosValidation, deleteCompanions);

//Ruta para agregar Cabañas
router.post("/cabins", addCabinsValidation,addCabin,);
export default router;
