import { validationResult } from "express-validator";
import {
  getAllReservationsService,
  getReservationsByIdService,
  createReservationsService,
  updateReservationsService,
  addCompanionsServices,
  addPaymentsServices,
  addPlansServices,
  updateCompanionsService,
  deleteCompanionsService,
  changeStatusReservationsService

} from "../services/Reservations_Services.js"
import { json } from "sequelize";



export const getAllReservationsController = async (req, res) => {
  try {
    const reservations = await getAllReservationsService();

    console.log('Reservas enviadas al cliente:', reservations);
    console.log("Datos obtenidos de Sequelize:", JSON.stringify(reservations, null, 2));

    if (!reservations || reservations.length === 0) {
      return res.status(404).json({ message: "No hay reservas registradas" });
    }

    res.status(200).json(reservations);
  } catch (error) {
    console.error("Error al obtener reservas:", error.message);
    res.status(500).json({ error: error.message });
  }
};

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
};

export const createReservationsController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const reservationData = {
      ...req.body,
    };
    const reservations = await createReservationsService(reservationData);
    res.status(201).json(reservations);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const updateReservationsController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { id } = req.params;
    const reservationData = req.body;
    const reservations = await updateReservationsService(id, reservationData);
    res.status(200).json(reservations);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const changeStatusReservationsController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    await changeStatusReservationsService(req.params.id, req.body.status);
    res.status(200).end();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllReservationsCompanions = async (req, res) => {
  try {
    const companionsData = await getAllReservationsCompanions();
    res.status(200).json(companionsData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const addCompanions = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { idReservation, idCompanion } = req.params;
    await addCompanionsServices(idReservation, idCompanion);
    res.status(200).json({ message: 'Acompañante agregado exitosamente' });
  } catch (error) {
    console.error('Error al agregar acompañante: ', error);
    res.status(400).json({ message: error.message });
  }
};

export const addPayments = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { idReservation, idPayments } = req.body;
    console.log('Datos recibidos en el controlador:', { idReservation, idPayments })
    await addPaymentsServices(idReservation, idPayments);
    res.status(200).json({ message: 'Pago agregado exitosamente' });
  } catch (error) {
    console.error('Error al agregar el pago: ', error);
    res.status(400).json({ message: error.message });

  }
};

export const addPlans = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { idReservation, idPlan } = req.body;
    console.log('Datos recibidos en el controlador:', { idReservation, idPlan })
    await addPlansServices(idReservation, idPlan);
    res.status(200).json({ message: 'Plan Agregado exitosamente' })
  } catch (error) {
    console.error('Error al agregar el plan: ', error);
    res.status(400), json({ message: error.message })

  }

}

export const updateCompanion = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { idReservationsCompanions } = req.params;
    await updateCompanionsService(idReservationsCompanions);
    res.status(200).json({ message: 'Acompañante actualizado exitosamente' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteCompanions = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { idReservationsCompanions } = req.params;
    await deleteCompanionsService(idReservationsCompanions);
    res.status(200).json({ message: "Acompañante eliminado exitosamente" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};