import {
    getAllReservationsService,
    getReservationsByIdService,
    createReservationsService,
    updateReservationsService,

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
    try {
      const { id } = req.params;
      const reservation = await getReservationsByIdService(id);
      res.status(200).json(reservation);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  export const createReservationsController = async (req, res) => {
    try {
      const data = req.body;
      const newReservation = await createReservationsService(data);
      res.status(201).json(newReservation);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  export const updateReservationsController = async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const updatedReservation = await updateReservationsService(id, data);
      res.status(200).json(updatedReservation);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  