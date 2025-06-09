import { validationResult } from "express-validator"
import { Payments } from "../models/Payments_Model.js"
import { Cabins } from "../models/Cabin_Model.js"
import { Bedrooms } from "../models/Bedrooms_Model.js"
import { Services } from "../models/Services_Model.js"
import { Reservations } from "../models/Reservations_Model.js"
import { PaymentsReservations } from "../models/Payments_Reservations_model.js"
import { ReservationsCabins } from "../models/Reservations_cabins_Model.js"
import { ReservationsBedrooms } from "../models/Reservations_Bedrooms_Model.js"
import { ReservationsService } from "../models/Reservations_Service_Model.js"

import {
  getAllReservationsService,
  getReservationsByIdService,
  getReservationsByUserService,
  createReservationsService,
  addCompanionsServices,
  addPlansServices,
  updateCompanionsService,
  deleteCompanionsService,
  changeStatusReservationsService,
  addCabinService,
  addBedroomsService,
  addServiceService,
} from "../services/Reservations_Services.js"
import { json } from "sequelize"

export const getAllReservationsController = async (req, res) => {
  try {
    const reservations = await getAllReservationsService()

    console.log("Reservas enviadas al cliente:", reservations)
    console.log("Datos obtenidos de Sequelize:", JSON.stringify(reservations, null, 2))
    res.status(200).json(reservations)
  } catch (error) {
    console.error("Error al obtener reservas:", error.message)
    res.status(500).json({ error: error.message })
  }
}

export const getReservationsByIdController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    console.log("ID recibido en el controlador:", req.params.idReservation);
    const reservation = await getReservationsByIdService(req.params.idReservation);
    if (!reservation) {
      return res.status(404).json({ message: "Reserva no encontrada" });
    }
    res.status(200).json(reservation);
  } catch (error) {
    console.error("Error en el controlador:", error.message);
    res.status(400).json({ message: error.message });
  }
}


export const createReservationsController = async (req, res) => {

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    console.log("🚀 Datos recibidos en createReservationsController:", req.body)

    // Extraer todos los campos especiales
    const { idCabin, idRoom, services, ...reservationData } = req.body

    console.log("📋 Datos extraídos:", {
      idCabin,
      idRoom,
      services,
      reservationData,
    })

    // Crear la reserva básica primero
    const reservation = await createReservationsService(reservationData)
    console.log("✅ Reserva básica creada:", reservation)

    let updatedReservation = reservation

    // Manejar cabaña si se proporcionó
    if (idCabin) {
      console.log("🏠 Procesando cabaña:", idCabin)
      const cabinExists = await Cabins.findByPk(idCabin)
      if (!cabinExists) {
        return res.status(400).json({ error: "La cabaña especificada no existe" })
      }

      await ReservationsCabins.create({
        idReservation: reservation.idReservation,
        idCabin: idCabin,
      })
      console.log("✅ Cabaña asociada exitosamente")
    }

    // Manejar habitación si se proporcionó
    if (idRoom) {
      console.log("🛏️ Procesando habitación:", idRoom)
      const roomExists = await Bedrooms.findByPk(idRoom)
      if (!roomExists) {
        return res.status(400).json({ error: "La habitación especificada no existe" })
      }

      await ReservationsBedrooms.create({
        idReservation: reservation.idReservation,
        idRoom: idRoom,
      })
      console.log("✅ Habitación asociada exitosamente")
    }

    // 🔧 SERVICIOS: Procesar con cantidades
    if (services && Array.isArray(services) && services.length > 0) {
      console.log("🛎️ Procesando servicios con cantidades:", services)

      for (const serviceData of services) {
        const serviceId = serviceData.serviceId || serviceData.Id_Service
        const quantity = serviceData.quantity || 1

        console.log(`🔍 Procesando servicio:`, { serviceId, quantity })

        if (!serviceId) {
          console.warn(`⚠️ Servicio sin ID válido, saltando:`, serviceData)
          continue
        }

        // Verificar que el servicio existe
        const serviceExists = await Services.findByPk(serviceId)
        if (!serviceExists) {
          console.warn(`⚠️ Servicio con ID ${serviceId} no existe, saltando...`)
          continue
        }

        console.log(`✅ Servicio encontrado:`, serviceExists.toJSON())

        // ✅ CREAR UN SOLO REGISTRO CON QUANTITY
        await ReservationsService.create({
          idReservation: reservation.idReservation,
          Id_Service: serviceId,
          quantity: quantity, // ✅ USAR EL CAMPO QUANTITY
        })

        console.log(`✅ Servicio ${serviceId} actualizado con cantidad ${quantity}`)
      }
    }

    // Obtener la reserva completa con todas las asociaciones
    updatedReservation = await Reservations.findByPk(reservation.idReservation, {
      include: [
        {
          model: Cabins,
          as: "cabins",
          through: { attributes: [] },
        },
        {
          model: Bedrooms,
          as: "bedrooms",
          through: { attributes: [] },
        },
        {
          model: Services,
          as: "services",
          through: { attributes: [] },
        },
      ],
    })

    console.log("🎉 Reserva completa creada:", updatedReservation)
    res.status(201).json(updatedReservation)
  } catch (error) {
    console.error("❌ Error en createReservationsController:", error)
    res.status(400).json({ message: error.message })
  }
}

export const updateReservationsController = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    console.log("✏️ === INICIO UPDATE CONTROLLER ===")
    console.log("📥 Datos recibidos en updateReservationsController:", JSON.stringify(req.body, null, 2))

    const { idReservation } = req.params
    const { idCabin, idRoom, services, ...reservationData } = req.body

    console.log("📋 Datos extraídos para actualización:", {
      idReservation,
      idCabin,
      idRoom,
      services,
      reservationData,
    })

    // Verificar que la reserva existe
    const existingReservation = await Reservations.findByPk(idReservation)
    if (!existingReservation) {
      return res.status(404).json({
        error: `Reserva con ID ${idReservation} no encontrada`,
        suggestion: "Verifique el ID o cree una nueva reserva",
      })
    }

    console.log("✅ Reserva existente encontrada:", existingReservation.toJSON())

    // Actualizar los campos básicos
    await existingReservation.update(reservationData)
    console.log("✅ Datos básicos actualizados")

    // 🔧 ACTUALIZAR CABAÑA - Corregido
    if (idCabin !== undefined) {
      console.log("🏠 Actualizando cabaña:", idCabin)

      // Eliminar asociaciones existentes
      await ReservationsCabins.destroy({
        where: { idReservation },
      })
      console.log("🗑️ Asociaciones de cabaña anteriores eliminadas")

      if (idCabin && idCabin !== null) {
        const cabinExists = await Cabins.findByPk(idCabin)
        if (!cabinExists) {
          return res.status(400).json({ error: "La cabaña especificada no existe" })
        }

        await ReservationsCabins.create({
          idReservation,
          idCabin,
        })
        console.log("✅ Nueva cabaña asociada")
      }
    }

    // 🔧 ACTUALIZAR HABITACIÓN - Corregido
    if (idRoom !== undefined) {
      console.log("🛏️ Actualizando habitación:", idRoom)

      // Eliminar asociaciones existentes
      await ReservationsBedrooms.destroy({
        where: { idReservation },
      })
      console.log("🗑️ Asociaciones de habitación anteriores eliminadas")

      if (idRoom && idRoom !== null) {
        const roomExists = await Bedrooms.findByPk(idRoom)
        if (!roomExists) {
          return res.status(400).json({ error: "La habitación especificada no existe" })
        }

        await ReservationsBedrooms.create({
          idReservation,
          idRoom,
        })
        console.log("✅ Nueva habitación asociada")
      }
    }

    // 🔧 ACTUALIZAR SERVICIOS - Corregido y con logs detallados
    if (services !== undefined) {
      console.log("🛎️ === ACTUALIZANDO SERVICIOS ===")
      console.log("📊 Servicios recibidos:", JSON.stringify(services, null, 2))

      // Eliminar todos los servicios existentes
      const deletedCount = await ReservationsService.destroy({
        where: { idReservation },
      })
      console.log(`🗑️ ${deletedCount} servicios anteriores eliminados`)

      if (Array.isArray(services) && services.length > 0) {
        console.log("➕ Procesando nuevos servicios...")

        for (const serviceData of services) {
          const serviceId = serviceData.serviceId || serviceData.Id_Service
          const quantity = serviceData.quantity || 1

          console.log(`🔍 Procesando servicio:`, { serviceId, quantity, serviceData })

          if (!serviceId) {
            console.warn(`⚠️ Servicio sin ID válido en actualización, saltando:`, serviceData)
            continue
          }

          // Verificar que el servicio existe
          const serviceExists = await Services.findByPk(serviceId)
          if (!serviceExists) {
            console.warn(`⚠️ Servicio con ID ${serviceId} no existe, saltando...`)
            continue
          }

          console.log(`✅ Servicio encontrado para actualización:`, {
            id: serviceExists.Id_Service,
            name: serviceExists.name,
          })

          // ✅ CREAR UN SOLO REGISTRO CON QUANTITY
          await ReservationsService.create({
            idReservation,
            Id_Service: serviceId,
            quantity: quantity, // ✅ USAR EL CAMPO QUANTITY
          })

          console.log(`✅ Servicio ${serviceId} actualizado con cantidad ${quantity}`)
        }

        console.log("✅ Todos los servicios procesados exitosamente")
      } else {
        console.log("ℹ️ No hay servicios para agregar")
      }
    }

    // Obtener la reserva actualizada con todas las asociaciones
    const updatedReservation = await Reservations.findByPk(idReservation, {
      include: [
        {
          model: Cabins,
          as: "cabins",
          through: { attributes: [] },
        },
        {
          model: Bedrooms,
          as: "bedrooms",
          through: { attributes: [] },
        },
        {
          model: Services,
          as: "services",
          through: { attributes: [] },
        },
      ],
    })

    console.log("🎉 === RESERVA ACTUALIZADA COMPLETAMENTE ===")
    console.log("📤 Enviando respuesta:", JSON.stringify(updatedReservation, null, 2))

    res.status(200).json(updatedReservation)
  } catch (error) {
    console.error("❌ === ERROR EN UPDATE CONTROLLER ===")
    console.error("Error completo:", error)
    console.error("Error message:", error.message)
    console.error("Error stack:", error.stack)

    res.status(500).json({
      error: "Error interno del servidor",
      message: error.message,
      details: process.env.NODE_ENV === "development" ? error.stack : undefined,
    })
  }
}

// Función auxiliar para contar servicios por tipo
export const getServiceQuantitiesForReservation = async (idReservation) => {
  try {
    const serviceRecords = await ReservationsService.findAll({
      where: { idReservation },
      include: [
        {
          model: Services,
          as: "service",
          attributes: ["Id_Service", "name", "Price"],
        },
      ],
    })

    // Agrupar por servicio y contar
    const serviceCounts = {}
    serviceRecords.forEach((record) => {
      const serviceId = record.Id_Service
      if (serviceCounts[serviceId]) {
        serviceCounts[serviceId].quantity += 1
      } else {
        serviceCounts[serviceId] = {
          serviceId: serviceId,
          name: record.service?.name || "Servicio desconocido",
          price: record.service?.Price || 0,
          quantity: 1,
        }
      }
    })

    return Object.values(serviceCounts)
  } catch (error) {
    console.error("Error al obtener cantidades de servicios:", error)
    return []
  }
}

export const getReservationsByUserController = async (req, res) => {
  try {
    const { userId } = req.params

    console.log("👤 Controlador: Obteniendo reservas para usuario:", userId)

    if (!userId) {
      return res.status(400).json({
        error: "ID de usuario requerido",
        message: "Debe proporcionar un ID de usuario válido",
      })
    }

    const reservations = await getReservationsByUserService(userId)

    console.log(`✅ Controlador: Enviando ${reservations.length} reservas al cliente`)

    res.status(200).json(reservations)
  } catch (error) {
    console.error("❌ Error en getReservationsByUserController:", error.message)

    if (error.message === "ID de usuario inválido") {
      return res.status(400).json({
        error: "ID de usuario inválido",
        message: "El ID de usuario debe ser un número positivo",
      })
    }

    res.status(500).json({
      error: "Error interno del servidor",
      message: "Error al obtener las reservas del usuario",
      details: process.env.NODE_ENV === "development" ? error.message : undefined,
    })
  }
}

export const changeStatusReservationsController = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  try {
    await changeStatusReservationsService(req.params.idReservation, req.body.status)
    res.status(200).end()
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const getAllReservationsCompanions = async (req, res) => {
  try {
    const companionsData = await getAllReservationsCompanions()
    res.status(200).json(companionsData)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const addCompanions = async (req, res) => {
  try {
    const { idReservation } = req.params
    const { idCompanions } = req.body

    console.log("Datos recibidos:", { idReservation, idCompanions })

    if (!idCompanions) {
      return res.status(400).json({ message: "Falta el ID del acompañante" })
    }

    const reservationId = Number(idReservation)
    const companionId = Number(idCompanions)

    if (isNaN(reservationId)) {
      return res.status(400).json({ message: "ID de reserva inválido" })
    }

    if (isNaN(companionId)) {
      return res.status(400).json({ message: "ID de acompañante inválido" })
    }

    await addCompanionsServices(reservationId, companionId)
    res.status(200).json({
      message: "Acompañante agregado exitosamente",
      idReservation: reservationId,
      idCompanions: companionId,
    })
  } catch (error) {
    console.error("Error detallado:", {
      message: error.message,
      stack: error.stack,
      requestBody: req.body,
    })

    res.status(400).json({
      message: error.message,
      details: error.response?.data || error.stack,
    })
  }
}

export const addPaymentToReservationController = async (req, res) => {
  try {
    console.log("Datos recibidos en el backend:", req.body)
    console.log("Archivo recibido:", req.file) // ✅ Agregar log para el archivo

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

    // ✅ Crear objeto de pago con datos básicos
    const paymentData = {
      paymentMethod,
      amount: Number.parseFloat(amount),
      paymentDate: paymentDate || new Date(),
      status: status || "Pendiente",
    }

    // ✅ Agregar información del archivo si existe
    if (req.file) {
      paymentData.voucher = `/uploads/payments/${req.file.filename}`
      paymentData.voucherType = req.file.mimetype
      console.log("Información de voucher agregada:", {
        path: paymentData.voucher,
        type: paymentData.voucherType,
      })
    }

    // ✅ Crear el pago con toda la información
    const payment = await Payments.create(paymentData)
    console.log("Pago creado:", payment)
    console.log("ID del pago creado:", payment.idPayments)

    await PaymentsReservations.create({
      idReservation,
      idPayments: payment.idPayments,
      amountApplied: payment.amount,
    })

    res.status(201).json({
      success: true,
      message: "Pago agregado correctamente",
      payment,
    })
  } catch (error) {
    console.error("Error en el controlador de pagos:", error)
    res.status(400).json({
      success: false,
      message: error.message,
      ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
    })
  }
}


export const addPlans = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  try {
    const { idReservation, idPlan } = req.body
    console.log("Datos recibidos en el controlador:", {
      idReservation,
      idPlan,
    })
    await addPlansServices(idReservation, idPlan)
    res.status(200).json({ message: "Plan Agregado exitosamente" })
  } catch (error) {
    console.error("Error al agregar el plan: ", error)
    res.status(400), json({ message: error.message })
  }
}

export const addCabin = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  try {
    const { idReservation, idCabin } = req.body
    console.log("Datos de la cabaña:", { idReservation, idCabin })
    await addCabinService(idReservation, idCabin)
    res.status(200).json({ message: "Cabañas agregadas exitosamente" })
  } catch (error) {
    console.error("Error al agregar la cabaña:", error)
    res.status(400).json({ message: error.message })
  }
}

export const addBedrooms = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  try {
    const { idReservation, idRoom } = req.body
    console.log("🛏️ Datos de la habitación:", { idReservation, idRoom })
    await addBedroomsService(idReservation, idRoom)
    res.status(200).json({ message: "Habitaciones agregadas exitosamente" })
  } catch (error) {
    console.error("❌ Error al agregar la habitación:", error)
    res.status(400).json({ message: error.message })
  }
}

export const addService = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  try {
    const { idReservation, Id_Service } = req.body
    console.log("🛎️ Datos del servicio:", { idReservation, Id_Service })

    await addServiceService(idReservation, Id_Service)
    res.status(200).json({ message: "Servicios agregados exitosamente" })
  } catch (error) {
    console.error("❌ Error al agregar el servicio:", error)
    res.status(400).json({ message: error.message })
  }
}

export const updateCompanion = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  try {
    const { idReservationsCompanions } = req.params
    await updateCompanionsService(idReservationsCompanions)
    res.status(200).json({ message: "Acompañante actualizado exitosamente" })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const deleteCompanions = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  try {
    const { idReservationsCompanions } = req.params
    await deleteCompanionsService(idReservationsCompanions)
    res.status(200).json({ message: "Acompañante eliminado exitosamente" })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
