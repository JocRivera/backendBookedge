import { validationResult } from "express-validator";
import {
  createPaymentService,
  getPaymentByIdService,
  updatePaymentService,
  deletePaymentService,
  getPaymentByReservationIdService,
  getAllPaymentsService,
} from "../services/Payments_Services.js";

export const getAllPaymentsController = async (req, res) => {
  try {
    const payments = await getAllPaymentsService();
    res.status(200).json(payments);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const createPaymentController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const payment = await createPaymentService(req.body);
    res.status(201).json(payment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getPaymentByIdController = async (req, res) => {
  try {
    const payment = await getPaymentByIdService(req.params.id);
    if (!payment) {
      return res.status(404).json({ message: "Pago no encontrado" });
    }
    res.status(200).json(payment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updatePaymentController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const payment = await updatePaymentService(req.params.id, req.body);
    res.status(200).json(payment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deletePaymentController = async (req, res) => {
  try {
    await deletePaymentService(req.params.id);
    res.status(200).json({ message: "Pago eliminado exitosamente" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getPaymentByReservationIdController = async (req, res) => {
  try {
    const payment = await getPaymentByReservationIdService(req.params.reservation_id);
    if (!payment) {
      return res.status(404).json({ message: "Pago no encontrado" });
    }
    res.status(200).json(payment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};