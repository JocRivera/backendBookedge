import { Reservations } from "../models/Reservations_Model.js";

export const getAllReservations = async () => {
  try {
    const reservations = await Reservations.findAll(); 
    return {
      success: true,
      data: reservations,
    };
  } catch (error) {
    console.error("Error en getAllReservations:", error);
    return {
      success: false,
      error: "Error al obtener las reservas",
    };
  }
};

export const getReservationsById = async (id) => {
  try {
    const reservation = await Reservations.findByPk(id);

    if (!reservation) {
      return {
        success: false,
        error: "Reserva no encontrada",
      };
    }

    return {
      success: true,
      data: reservation,
    };
  } catch (error) {
    console.error("Error en getReservationById:", error);
    return {
      success: false,
      error: "Error al obtener la reserva",
    };
  }
};

export const createReservations = async (data) => {
  try {
    const reservation = await Reservations.create(data);
    return {
      success: true,
      data: reservation,
    };
  } catch (error) {
    console.error("Error en createReservation:", error);
    return {
      success: false,
      error: "Error al crear la reserva",
    };
  }
};

export const updateReservations = async (id, data) => {
  try {
    const [updatedRows] = await Reservations.update(data, {
      where: { id_reservation: id }, 
    });

    if (updatedRows === 0) {
      return {
        success: false,
        error: "No se encontró la reserva para actualizar",
      };
    }

    const updatedReservation = await Reservations.findByPk(id);

    return {
      success: true,
      data: updatedReservation,
    };
  } catch (error) {
    console.error("Error en updateReservation:", error);
    return {
      success: false,
      error: "Error al actualizar la reserva",
    };
  }
};
