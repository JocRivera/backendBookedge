import express from "express";
import {
  createPaymentController,
  getPaymentByIdController,
  updatePaymentController,
  deletePaymentController,
  getAllPaymentsController, 
  addPaymentToReservationController,
  getReservationPaymentsController
} from "../controllers/Payments_Controllers.js";
import {
  createPaymentValidation,
  updatePaymentValidation,
  getPaymentByIdValidation,
  deletePaymentValidation,
} from "../middlewares/Validate_Payments.js";

const router = express.Router();

// Rutas para los pagos
router.post("/", createPaymentValidation, createPaymentController);
router.get("/", getAllPaymentsController); 
router.get("/:id", getPaymentByIdValidation, getPaymentByIdController);
router.put("/:id", updatePaymentValidation, updatePaymentController);
router.delete("/:id", deletePaymentValidation, deletePaymentController);
router.post(
  '/reservations/:idReservation/payments',addPaymentToReservationController
);

router.get('/reservations/:idReservation/payments',getReservationPaymentsController
);

export default router;