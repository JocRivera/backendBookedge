import multer from 'multer';
import path from 'path';
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { validationResult } from "express-validator";
import {
  createPaymentService,
  getPaymentByIdService,
  updatePaymentService,
  deletePaymentService,
  getAllPaymentsService,
  getReservationPaymentsService
} from "../services/Payments_Services.js";


// Configuración esencial para obtener __dirname en ES Modules
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 1. Configuración de Multer (parte superior del archivo)
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads/payments/');
    
    try {
      await fs.mkdir(uploadDir, { recursive: true });
      cb(null, uploadDir);
    } catch (error) {
      cb(error);
    }
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `voucher-${uniqueSuffix}${ext}`);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Formato no soportado. Solo JPEG, PNG o PDF'), false);
  }
};

export const uploadVoucher = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { 
    fileSize: 2 * 1024 * 1024 // 2MB
  }
}).single('voucher');


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
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {

    const paymentData = {
      paymentMethod: req.body.paymentMethod,
      paymentDate: req.body.paymentDate,
      amount: req.body.amount,
      status: req.body.status || 'Pendiente', // Valor por defecto
      confirmationDate: req.body.confirmationDate || null,
    };

    if (req.file) {
      paymentData.voucher = req.file.path;
      paymentData.voucherType = req.file.mimetype;
    }

    const payment = await createPaymentService(paymentData);
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
    const paymentData = {
      ...req.body,
      ...(req.file && {
        voucher: req.file.path,
        voucherType: req.file.mimetype
      })
    };

    const payment = await updatePaymentService(req.params.id, paymentData);
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

export const addPaymentToReservationController = async (req, res) => {
  try {
    const { idReservation } = req.params;
    const payment = await addPaymentToReservationService(idReservation, req.body);
    res.status(201).json(payment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getReservationPaymentsController = async (req, res) => {
  try {
    const payments = await getReservationPaymentsService(req.params.idReservation);
    res.status(200).json(payments);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};