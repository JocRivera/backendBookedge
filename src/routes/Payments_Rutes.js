import express from "express";
import {
  createPaymentController,
  getPaymentByIdController,
  updatePaymentController,
  deletePaymentController,
  getAllPaymentsController, 
  getReservationPaymentsController,
  changeStatusPaymentsController
} from "../controllers/Payments_Controllers.js";

import {
  createPaymentValidation,
  updatePaymentValidation,
  getPaymentByIdValidation,
  deletePaymentValidation,
  changeStatusPaymentsValidation
} from "../middlewares/Validate_Payments.js";

import { uploadVoucher } from "../controllers/Payments_Controllers.js"; 

const router = express.Router();


router.post("/", uploadVoucher, createPaymentValidation, createPaymentController);

router.get("/", getAllPaymentsController); 

router.get("/:id", getPaymentByIdValidation, getPaymentByIdController);

router.put("/:id", uploadVoucher, updatePaymentValidation, updatePaymentController);

router.delete("/:id", deletePaymentValidation, deletePaymentController);

router.patch("/:id/status", changeStatusPaymentsValidation, changeStatusPaymentsController)

// Asociación de pagos a reservas

router.get('/reservations/:idReservation/payments', getReservationPaymentsController);

export default router;
