import { Reservations } from "../models/Reservations_Model.js";
import { Companions } from "../models/Companions_Model.js";
import { Payments } from "../models/Payments_Model.js";
import { Plans } from "../models/Plans_Model.js";
import { Users } from "../models/user_Model.js";
import { ReservationsCompanions } from "../models/Reservations_Companions_Models.js";
import { PaymentsReservations } from "../models/Payments_Reservations_model.js"



export const getAllReservations = async () => {
  try {
    return await Reservations.findAll({
      include: [
        {
          model: Companions,
          as: "companions",
          attributes: ["idCompanions", "name", "documentType", "documentNumber"],
          through: { attributes: [] },
        },
        {
          model: Payments,
          as: "payments",
          attributes: ["idPayments", "paymentMethod", "amount", "status"],
          through: { attributes: [] },
        },
        {
          model: Plans,
          as: "plan",
          attributes: ["idPlan", "name", "salePrice"],
        },
        {
          model: Users,
          as: 'user',
          attributes:['idUser','identification']

        }
      ],
    });
  } catch (error) {
    console.error("Error al obtener reservas:", error.message);
    throw error;
  }
};

export const getReservationsById = async (id) => {
  try {
    const reservationId = parseInt(id, 10); 
    console.log("ID recibido en el repositorio:", id); 
    const reservation = await Reservations.findByPk(id, {
      include: [
        {
          model: Companions,
          as: "companions",
          attributes: ["idCompanions", "name", "documentType", "documentNumber"],
          through: { attributes: [] },
        },
        {
          model: Payments,
          as: "payments",
          attributes: ["idPayments", "paymentMethod", "amount", "status"],
          through: { attributes: [] },
        },
        {
          model: Plans,
          as: "plan",
          attributes: ["idPlan", "name", "salePrice"],
        },
        {
          model: Users,
          as: 'user',
          attributes:['idUser','identification']

        }
      ],
    });

    if (!reservation) {
      throw new Error("Reserva no encontrada"); 
    }

    console.log("Reserva encontrada:", reservation); 
    return reservation;
  } catch (error) {
    console.error("Error al obtener reserva por ID:", error.message);
    throw error; 
  }
};

export const createReservations = async (reservationsData) => {
  return await Reservations.create(reservationsData);
};

export const updateReservations = async (id, reservationsData) => {
  await Reservations.update(reservationsData, {
    where: { idReservation: id },
  });
  return await Reservations.findByPk(id); 
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


export const addPaymentToReservation = async (idReservation, idPayment, amount) => {
  try {
    const relation = await PaymentsReservations.create({
      idReservation,
      idPayments: idPayment,
      amountApplied: amount
    });
    
    return relation;
  } catch (error) {
    console.error('Error en addPaymentToReservation:', error);
    throw error;
  }
};

export const addPlans = async (planData) => {
  console.log('Datos recibidos en el repositorio:', planData);
  return await PaymentsReservations.create(planData);
};