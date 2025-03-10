import { Reservations } from "../models/Reservations_Model.js";
import { Companions } from "../models/Companions_Model.js";
import { ReservationsCompanions } from "../models/Reservations_Companions_Models.js";

export const getAllReservations = async () => {
  return await Companions.findAll({
    include: [
      {
        model: Companions,
        as: 'Companions',
        attributes: ['idCompanions', 'name'],
        through: {
          attributes: [],
        },
      },
    ],
  });
};

export const getReservationsById = async (id) => {
  return await Reservations.findByPk(id, {
    include: [
      {
        model: Companions,
        as: 'Companions',
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
      where: { idReservations: id }
    }
  )
};


export const changeStatusReservations = async (id, status) => {
  return await Reservations.update({ status }, { where: { idReservations: id } });
};

export const addCompanions = async (
  idReservations,
  idCompanions
) => {
  const reservations = await Reservations.findByPk(idReservations);
  return await reservations.addCompanions(idCompanions, {
    through: { attributes: [] },
  });
};

export const updateCompanions = async (
  idReservationsCompanions,
  idReservations,
  idCompanions
) => {
  return await ReservationsCompanions.update(
    {
      idReservations,
      idCompanions
    }, {
    where: { idReservationsCompanions },
  }
  );
};

export const deleteCompanions= async (idReservationsCompanions) => {
  return await ReservationsCompanions.destroy({
    where: { idReservationsCompanions },
  });
}