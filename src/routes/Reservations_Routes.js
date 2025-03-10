import express from "express";
import {
  getAllReservationsController,
  getReservationsByIdController,
  createReservationsController,
  updateReservationsController,
  addCompanions,
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
  updateCompanionsValidation,
  deleteCompaniosValidation
}from '../middlewares/Validate_Reservations.js'


const router = express.Router();

//Rutas para la reserva
router.get("/", getAllReservationsController);
router.get("/:id",getReservationsValidation, getReservationsByIdController);
router.post("/",createReservationValidation, createReservationsController);
router.put("/:id",updateReservationsValidation,updateReservationsController);
router.patch("/:id/status", changeStateReservationsValidation, changeStatusReservationsController);


//Ruta para traer la reserva con su acompañante
router.get("/:id/companions",getReservationsValidation, addCompanions);
router.post("/:idReservation/Companions/id:Companion",addCompanionValidation,addCompanions);
router.put("/companions/:id/ReservationsCompanios",updateCompanionsValidation,updateCompanion);
router.delete("/companions/:id/ReservationsCompanios",deleteCompaniosValidation,deleteCompanions)
export default router;