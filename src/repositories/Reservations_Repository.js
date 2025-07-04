import { Reservations } from "../models/Reservations_Model.js";
import { Companions } from "../models/Companions_Model.js";
import { Payments } from "../models/Payments_Model.js";
import { Plans } from "../models/Plans_Model.js";
import { Users } from "../models/user_Model.js";
import { Cabins } from "../models/Cabin_Model.js";
import { Bedrooms } from "../models/Bedrooms_Model.js";
import { Services } from "../models/Services_Model.js"
import { ReservationsCompanions } from "../models/Reservations_Companions_Models.js";
import { ReservationsCabins } from "../models/Reservations_cabins_Model.js";
import { PaymentsReservations } from "../models/Payments_Reservations_model.js"
import { ReservationsBedrooms } from "../models/Reservations_Bedrooms_Model.js"
import { ReservationsService } from "../models/Reservations_Service_Model.js"
import { Sequelize } from "sequelize";

export const getReservationsServicesPer = async () => {
  return await Services.findAll({
    where: {
      StatusServices: true,
    }
  })
}

export const getCapacitiesBedroom = async () => {
  return await Bedrooms.findAll({
    attributes: [
      [Sequelize.fn('DISTINCT', Sequelize.col('capacity')), 'capacity']
    ],
    where: {
      status: "En Servicio"
    },
    order: [['capacity', 'ASC']]
  })
}

export const getCapacitiesCabins = async () => {
  return await Cabins.findAll({
    attributes: [
      'idCabin',
      'name',
      'description',
      'capacity',
      'status',
    ],
    where: {
      status: "En Servicio"
    },
    order: [['capacity', 'ASC']]
  });
};

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
          attributes: ['idUser', 'identification']

        },
        {
          model: Cabins,
          as: "cabins",
          attributes: ["idCabin", "name", "description", "capacity", "status"]

        },
        {
          model: Bedrooms,
          as: "bedrooms",
          attributes: ["idRoom", "name", "description", "capacity", "status"],
        },
        {
          model: Services,
          as: "services",
          attributes: ["Id_Service", "name", "description", "price"],
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
          attributes: ['idUser', 'identification']

        },
        {
          model: Cabins,
          as: "cabins",
          attributes: ["idCabin", "name", "description", "capacity", "status"]

        },
        {
          model: Bedrooms,
          as: "bedrooms",
          attributes: ["idRoom", "name", "description", "capacity", "status"],
        },
        {
          model: Services,
          as: "services",
          attributes: ["Id_Service", "name", "description", "price"],
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
export const getReservationsByUser = async (userId) => {
  try {
    console.log("🔍 Buscando reservas para el usuario:", userId)

    const reservations = await Reservations.findAll({
      where: {
        idUser: userId,
      },
      include: [
        {
          model: Companions,
          as: "companions",
          attributes: ["idCompanions", "name","documentNumber"],
          through: { attributes: [] },
        },
        {
          model: Payments,
          as: "payments",
          attributes: ["idPayments", "paymentMethod", "amount", "status", "paymentDate"],
          through: { attributes: [] },
        },
        {
          model: Plans,
          as: "plan",
          attributes: ["idPlan", "name", "salePrice", "description"],
        },
        {
          model: Users,
          as: "user",
          attributes: ["idUser", "identification", "name", "email"],
        },
        {
          model: Cabins,
          as: "cabins",
          attributes: ["idCabin", "name", "description", "capacity", "status"],
          through: { attributes: [] },
        },
        {
          model: Bedrooms,
          as: "bedrooms",
          attributes: ["idRoom", "name", "description", "capacity", "status"],
          through: { attributes: [] },
        },
        {
          model: Services,
          as: "services",
          attributes: ["Id_Service", "name", "description", "Price"],
          through: {
            attributes: [], 
            as: "reservationService",
          },
        },
      ],
      order: [["startDate", "DESC"]], // Ordenar por fecha más reciente
    })

    console.log(`✅ Encontradas ${reservations.length} reservas para el usuario ${userId}`)
    return reservations
  } catch (error) {
    console.error("❌ Error al obtener reservas por usuario:", error.message)
    throw error
  }
}


export const createReservations = async (reservationsData) => {
  console.log("🟢 Datos que se guardarán en Reservations:", reservationsData);
  const reservation = await Reservations.create(reservationsData);
  console.log("🟢 Reserva creada:", reservation.toJSON());
  return reservation;
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

export const addCabins = async (cabinData) => {
  console.log('Datos de la cabaña recibidos en el repositorio:', cabinData);
  return await ReservationsCabins.create(cabinData)
}

export const addBedrooms = async (bedroomData) => {
  console.log('Datos de la habitación recibidos en el repositorio:', bedroomData);
  return await ReservationsBedrooms.create(bedroomData)
}

export const addService = async (serviceData) => {
  console.log('Datos del servicio recibidos en el repositorio:', serviceData);
  return await ReservationsService.create(serviceData)
}
