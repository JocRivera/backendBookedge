import express from "express";
import {
  getAllReservationsController,
  getReservationsByIdController,
  createReservationsController,
  updateReservationsController,
} from "../controllers/Reservations_Controllers.js";

const router = express.Router();

router.get("/", getAllReservationsController);
router.get("/:id", getReservationsByIdController);
router.post("/", createReservationsController);
router.put("/:id", updateReservationsController);

export default router;