import { validationResult } from "express-validator";
import {
  getAllReservationsService,
  getReservationsByIdService,
  createReservationsService,
  updateReservationsService,
  addCompanionsServices,
  updateCompanionsService,
  deleteCompanionsService,
  changeStatusReservationsService

} from "../services/Reservations_Services.js"

export const getAllReservationsController = async (req, res) => {
  try {
    const reservations = await getAllReservationsService();
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getReservationsByIdController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ erros: errors.array() });
  }
  try {
    const reservations = await getReservationsByIdService(req.params.id);
    res.status(200).json;
  } catch (error) {
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
    return res.status(400).json({ erros: erros.array() });
  }
  try {
    const reservations = await updateReservationsService(id, reservationData);
    res.status(200).json(reservations);
    console.log(reservations)
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const changeStatusReservationsController = async (req, res) => {
  const errors = validationResult(req);
  if (!erros.isEmpty()) {
    return res.status(400)({ errors: errors.array() });
  }
  try {
    await changeStatusReservationsService(req.params.id, req.body.status);
    res.status(200).end();
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const getAllReservationsCompanions = async (req, res) => {
  try {
    const comfortData = await getAllReservationsCompanions();
    res.status(200).json(companionsData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const addCompanions = async (req, res) => {
  const errors = validationResult(req);
  if (!erros.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { idReservations, idCompanions } = req.params;
    await addCompanionsServices(idReservations, idCompanions);
    res.status(200).json({ message: 'Acompañante agregado exitosamente' })
  } catch (error) {
    console.error('Error al agregar acompañante: ', error);
    res.status(400).json({ message: error.message });
  }
};

export const updateCompanion = async (res, req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ erros: erros.array() });
  }
  try {
    const { idReservationsCompanions } = req.params;
    await updateCompanionsService(idReservationsCompanions);
    res.status(200).json({ message: 'Acompañante actializado exitosamente' });
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
    res.status(200).end();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};