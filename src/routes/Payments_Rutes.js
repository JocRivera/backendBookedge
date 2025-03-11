import express from "express";
import {
  createPaymentController,
  getPaymentByIdController,
  updatePaymentController,
  deletePaymentController,
  getPaymentByReservationIdController,
  getAllPaymentsController, 
} from "../controllers/Payments_Controllers.js";
import {
  createPaymentValidation,
  updatePaymentValidation,
  getPaymentByIdValidation,
  deletePaymentValidation,
  getPaymentByReservationIdValidation,
} from "../middlewares/Validate_Payments.js";

const router = express.Router();

// Rutas para los pagos
router.post("/", createPaymentValidation, createPaymentController);
router.get("/", getAllPaymentsController); 
router.get("/:id", getPaymentByIdValidation, getPaymentByIdController);
router.put("/:id", updatePaymentValidation, updatePaymentController);
router.delete("/:id", deletePaymentValidation, deletePaymentController);
router.get("/reservation/:reservation_id", getPaymentByReservationIdValidation, getPaymentByReservationIdController);

export default router;