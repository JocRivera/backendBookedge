import express from "express";
import {
  getAllReservationsController,
  getReservationsByIdController,
  createReservationsController,
  updateReservationsController,
  getReservationWithCompanion,
} from "../controllers/Reservations_Controllers.js";

const router = express.Router();

//Rutas para la reserva
router.get("/", getAllReservationsController);
router.get("/:id", getReservationsByIdController);
router.post("/", createReservationsController);
router.put("/:id", updateReservationsController);

//Ruta para traer la reserva con su acompañante
router.get("/reservations/:id", getReservationWithCompanion)
export default router;