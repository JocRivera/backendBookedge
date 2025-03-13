import { Reservations } from "../models/Reservations_Model.js";
import { Companions } from "../models/Companions_Model.js";
import { Payments } from "../models/Payments_Model.js";
import { ReservationsCompanions } from "../models/Reservations_Companions_Models.js";
import { PaymentsReservations } from "../models/Payments_Reservations_model.js"


export const getAllReservations = async () => {
  return await Reservations.findAll({
    include: [
      {
        model: Companions,
        as: "companions",
        attributes: ["idCompanions", "name", "documentType", "documentNumber"],
        through: { attributes: [] }
      },
    ],
    include: [
      {
        model: PaymentsReservations,
        attributes: ["idPayments"],
        through: { attributes }

      }
    ]
  });
};

export const getReservationsById = async (id) => {
  return await Reservations.findByPk(id, {
    include: [
      {
        model: Companions,
        as: "companions",
        attributes: ["idCompanions", "name", "documentType", "documentNumber"],
        through: { attributes: [] },

        model: PaymentsReservations,
        as: 'paymentsreservations',
        attributes: ["idPayments"],
        through: { attributes: [] }
      },

    ],
  });
};

export const createReservations = async (reservationsData) => {
  return await Reservations.create(reservationsData);
};

export const updateReservations = async (id, reservationsData) => {
  const [update] = await Reservations.update(reservationsData,
    {
      where: { idReservation: id }
    }
  )
};


export const changeStatusReservations = async (id, status) => {
  return await Reservations.update({ status }, { where: { idReservation: id } });
};

export const addCompanions = async (idReservation, idCompanions) => {
  try {
    // Buscar la reserva
    const reservation = await Reservations.findByPk(idReservation);
    if (!reservation) throw new Error("Reserva no encontrada");

    // Buscar el acompañante
    const companion = await Companions.findByPk(idCompanions);
    if (!companion) throw new Error("Acompañante no encontrado");

    // Asociar en la tabla intermedia
    return await ReservationsCompanions.create({ idReservation, idCompanions });


  } catch (error) {
    console.error("Error al agregar acompañante:", error.message);
    throw error;
  }
};

export const addPayments = async (idReservation, idPayments) => {
  try {
    // Verificar que la reserva exista
    const reservation = await Reservations.findByPk(idReservation);
    if (!reservation) {
      throw new Error("Reserva no encontrada");
    }

    // Verificar que el pago exista
    const payment = await Payments.findByPk(idPayments);
    if (!payment) {
      throw new Error("Pago no encontrado");
    }

    // Crear la asociación en PaymentsReservations
    const paymentReservation = await PaymentsReservations.create({
      idReservation,
      idPayments,
    });

    return paymentReservation;
  } catch (error) {
    console.error("Error al agregar el pago:", error.message);
    throw error;
  }
};

export const updateCompanions = async (
  idReservationsCompanions,
  idReservation,
  idCompanions
) => {
  return await ReservationsCompanions.update(
    {
      idReservation,
      idCompanions
    }, {
    where: { idReservationsCompanions },
  }
  );
};

export const deleteCompanions = async (idReservationsCompanions) => {
  console.log("ID recibido en el repositorio:", idReservationsCompanions); // Depuración
  return await ReservationsCompanions.destroy({
    where: { idReservationsCompanions },
  });
};