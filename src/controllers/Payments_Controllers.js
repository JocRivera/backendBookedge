import multer from "multer"
import path from "path"
import { promises as fs } from "fs"
import { fileURLToPath } from "url"
import { validationResult } from "express-validator"
import {
  createPaymentService,
  getPaymentByIdService,
  updatePaymentService,
  deletePaymentService,
  getAllPaymentsService,
  getReservationPaymentsService,
  changeStatusPaymentsService,
} from "../services/Payments_Services.js"
import { PaymentsReservations } from "../models/Payments_Reservations_model.js"

// Configuración esencial para obtener __dirname en ES Modules
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// ✅ CONFIGURACIÓN DE URL BASE
const getBaseUrl = (req) => {
  const protocol = req.protocol || "http"
  const host = req.get("host") || "localhost:3001"
  return `${protocol}://${host}`
}

// ✅ FUNCIÓN PARA CONVERTIR RUTAS RELATIVAS A URLs ABSOLUTAS
const buildAbsoluteUrl = (relativePath, req) => {
  if (!relativePath) return null

  // Si ya es una URL absoluta, devolverla tal como está
  if (relativePath.startsWith("http://") || relativePath.startsWith("https://")) {
    return relativePath
  }

  // Construir URL absoluta
  const baseUrl = getBaseUrl(req)
  const cleanPath = relativePath.startsWith("/") ? relativePath : `/${relativePath}`
  const absoluteUrl = `${baseUrl}${cleanPath}`

  console.log("🔗 Convirtiendo ruta:", {
    original: relativePath,
    baseUrl: baseUrl,
    absolute: absoluteUrl,
  })

  return absoluteUrl
}

// ✅ FUNCIÓN AUXILIAR PARA PROCESAR PAGOS CON URLs ABSOLUTAS
const processPaymentUrls = (payment, req) => {
  if (!payment) return payment

  // Si es un array de pagos
  if (Array.isArray(payment)) {
    return payment.map((p) => {
      const processed = {
        ...(p.toJSON ? p.toJSON() : p), // Manejar instancias de Sequelize
        voucher: buildAbsoluteUrl(p.voucher, req),
      }
      return processed
    })
  }

  // Si es un solo pago
  const processed = {
    ...(payment.toJSON ? payment.toJSON() : payment), // Manejar instancias de Sequelize
    voucher: buildAbsoluteUrl(payment.voucher, req),
  }

  return processed
}

// Configuración de Multer (sin cambios)
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadDir = path.join(__dirname, "../../uploads/payments/")

    try {
      await fs.mkdir(uploadDir, { recursive: true })
      cb(null, uploadDir)
    } catch (error) {
      console.error("Error creando directorio:", error)
      cb(error)
    }
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase()
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
    const filename = `voucher-${uniqueSuffix}${ext}`
    console.log("📁 Archivo guardado como:", filename)
    cb(null, filename)
  },
})

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "application/pdf"]
  console.log("📄 Tipo de archivo recibido:", file.mimetype)

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error("Formato no soportado. Solo JPEG, PNG o PDF"), false)
  }
}

export const uploadVoucher = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB
  },
}).single("voucher")

export const getAllPaymentsController = async (req, res) => {
  try {
    console.log("📤 Obteniendo todos los pagos...")
    const payments = await getAllPaymentsService()

    // ✅ CONVERTIR URLs RELATIVAS A ABSOLUTAS
    const paymentsWithAbsoluteUrls = processPaymentUrls(payments, req)

    console.log("✅ Enviando", paymentsWithAbsoluteUrls.length, "pagos con URLs absolutas")

    // Log de ejemplo para debugging
    if (paymentsWithAbsoluteUrls.length > 0 && paymentsWithAbsoluteUrls[0].voucher) {
      console.log("🔗 Ejemplo de URL convertida:", paymentsWithAbsoluteUrls[0].voucher)
    }

    res.status(200).json(paymentsWithAbsoluteUrls)
  } catch (error) {
    console.error("❌ Error en getAllPaymentsController:", error)
    res.status(400).json({ message: error.message })
  }
}

export const createPaymentController = async (req, res) => {
  console.log("=== INICIO CREAR PAGO ===")
  console.log("📥 Body recibido:", req.body)
  console.log("📁 Archivo recibido:", req.file)
  console.log("🌐 Host:", req.get("host"))
  console.log("🔒 Protocol:", req.protocol)

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    console.log("❌ Errores de validación:", errors.array())
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const paymentData = {
      paymentMethod: req.body.paymentMethod,
      paymentDate: req.body.paymentDate,
      amount: Number.parseFloat(req.body.amount),
      status: req.body.status || "Pendiente",
      confirmationDate: req.body.confirmationDate || null,
    }

    // ✅ PROCESAR COMPROBANTE SI EXISTE
    if (req.file) {
      console.log("📁 Procesando comprobante:", {
        filename: req.file.filename,
        path: req.file.path,
        size: req.file.size,
        mimetype: req.file.mimetype,
      })

      // Guardar la ruta relativa en la base de datos
      paymentData.voucher = `/uploads/payments/${req.file.filename}`
      paymentData.voucherType = req.file.mimetype
    }

    console.log("💾 Datos finales del pago:", paymentData)
    const payment = await createPaymentService(paymentData)

    // ✅ CONVERTIR A URL ABSOLUTA ANTES DE ENVIAR RESPUESTA
    const paymentWithAbsoluteUrl = processPaymentUrls(payment, req)

    console.log("✅ Pago creado exitosamente:", payment.idPayments)
    console.log("🌐 URL absoluta del comprobante:", paymentWithAbsoluteUrl.voucher)

    res.status(201).json(paymentWithAbsoluteUrl)
  } catch (error) {
    console.error("❌ Error en createPaymentController:", error)
    res.status(400).json({
      message: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    })
  }
}

export const getPaymentByIdController = async (req, res) => {
  try {
    console.log("🔍 Obteniendo pago por ID:", req.params.id)
    const payment = await getPaymentByIdService(req.params.id)

    if (!payment) {
      return res.status(404).json({ message: "Pago no encontrado" })
    }

    // ✅ CONVERTIR A URL ABSOLUTA
    const paymentWithAbsoluteUrl = processPaymentUrls(payment, req)

    console.log("✅ Pago encontrado con URL absoluta:", paymentWithAbsoluteUrl.voucher)
    res.status(200).json(paymentWithAbsoluteUrl)
  } catch (error) {
    console.error("❌ Error en getPaymentByIdController:", error)
    res.status(400).json({ message: error.message })
  }
}

export const updatePaymentController = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    console.log("🔄 Actualizando pago:", req.params.id)
    const paymentData = {
      ...req.body,
      amount: Number.parseFloat(req.body.amount),
    }

    // ✅ ACTUALIZAR COMPROBANTE SI SE PROPORCIONA UNO NUEVO
    if (req.file) {
      console.log("📁 Actualizando comprobante:", req.file.filename)
      paymentData.voucher = `/uploads/payments/${req.file.filename}`
      paymentData.voucherType = req.file.mimetype
    }

    const payment = await updatePaymentService(req.params.id, paymentData)

    // ✅ CONVERTIR A URL ABSOLUTA
    const paymentWithAbsoluteUrl = processPaymentUrls(payment, req)

    console.log("✅ Pago actualizado con URL absoluta:", paymentWithAbsoluteUrl.voucher)
    res.status(200).json(paymentWithAbsoluteUrl)
  } catch (error) {
    console.error("❌ Error en updatePaymentController:", error)
    res.status(400).json({ message: error.message })
  }
}

export const deletePaymentController = async (req, res) => {
  try {
    console.log("🗑️ Eliminando pago:", req.params.id)
    await deletePaymentService(req.params.id)
    res.status(200).json({ message: "Pago eliminado exitosamente" })
  } catch (error) {
    console.error("❌ Error en deletePaymentController:", error)
    res.status(400).json({ message: error.message })
  }
}

export const getReservationPaymentsController = async (req, res) => {
  try {
    console.log("📋 Obteniendo pagos de reserva:", req.params.idReservation)
    const payments = await getReservationPaymentsService(req.params.idReservation)

    // ✅ CONVERTIR URLs RELATIVAS A ABSOLUTAS
    const paymentsWithAbsoluteUrls = processPaymentUrls(payments, req)

    console.log("✅ Enviando", paymentsWithAbsoluteUrls.length, "pagos de reserva con URLs absolutas")
    res.status(200).json(paymentsWithAbsoluteUrls)
  } catch (error) {
    console.error("❌ Error en getReservationPaymentsController:", error)
    res.status(400).json({ message: error.message })
  }
}

export const changeStatusPaymentsController = async (req, res) => {
  try {
    const { status } = req.body
    const id = Number.parseInt(req.params.id)

    if (isNaN(id)) {
      return res.status(400).json({ message: "ID inválido" })
    }

    console.log(`🔄 Cambiando estado del pago ${id} a: ${status}`)
    const updatedPayment = await changeStatusPaymentsService(id, status)

    // ✅ CONVERTIR A URL ABSOLUTA
    const paymentWithAbsoluteUrl = processPaymentUrls(updatedPayment, req)

    console.log("✅ Estado actualizado, URL absoluta:", paymentWithAbsoluteUrl.voucher)

    return res.status(200).json({
      message: "Estado actualizado correctamente",
      payment: paymentWithAbsoluteUrl,
      paymentId: id,
      newStatus: status,
    })
  } catch (error) {
    console.error("❌ Error al cambiar estado del pago:", error)
    return res.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    })
  }
}

export const addPaymentToReservationController = async (req, res) => {
  try {
    console.log("💳 Agregando pago a reserva:", req.params.idReservation)
    console.log("📥 Datos recibidos:", req.body)
    console.log("📁 Archivo recibido:", req.file)
    console.log("🌐 Host:", req.get("host"))

    const { idReservation } = req.params
    const { paymentMethod, amount, paymentDate, status } = req.body

    if (!paymentMethod || !amount) {
      return res.status(400).json({
        success: false,
        message: "Faltan campos requeridos",
        required: ["paymentMethod", "amount"],
        received: req.body,
      })
    }

    const paymentData = {
      paymentMethod,
      amount: Number.parseFloat(amount),
      paymentDate: paymentDate || new Date(),
      status: status || "Pendiente",
    }

    // ✅ AGREGAR COMPROBANTE SI EXISTE
    if (req.file) {
      console.log("📁 Comprobante incluido:", req.file.filename)
      paymentData.voucher = `/uploads/payments/${req.file.filename}`
      paymentData.voucherType = req.file.mimetype
    }

    const payment = await createPaymentService(paymentData)
    console.log("✅ Pago creado:", payment.idPayments)

    // Asociar pago a la reserva
    await PaymentsReservations.create({
      idReservation,
      idPayments: payment.idPayments,
      amountApplied: payment.amount,
    })

    // ✅ CONVERTIR A URL ABSOLUTA ANTES DE ENVIAR RESPUESTA
    const paymentWithAbsoluteUrl = processPaymentUrls(payment, req)

    console.log("✅ Pago asociado a reserva exitosamente")
    console.log("🌐 URL absoluta del comprobante:", paymentWithAbsoluteUrl.voucher)

    res.status(201).json({
      success: true,
      message: "Pago agregado correctamente",
      payment: paymentWithAbsoluteUrl,
    })
  } catch (error) {
    console.error("❌ Error en addPaymentToReservationController:", error)
    res.status(400).json({
      success: false,
      message: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    })
  }
}
