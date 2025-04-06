import { Cabins } from "../models/Cabin_Model.js";
import { Comforts } from "../models/Comfort_Model.js";
import { CabinsComforts } from "../models/Cabins_Comforts.js";

export const getAllCabinsRepository = async () => {
  return await Cabins.findAll({
    include: [
      {
        model: Comforts,
        as: "Comforts",
        attributes: ["idComfort", "name"],
        through: { attributes: [] },
      },
    ],
  });
};

export const getCabinByIdRepository = async (id) => {
  return await Cabins.findByPk(id, {
    include: [
      {
        model: Comforts,
        as: "Comforts",
        attributes: ["idComfort", "name"],
      },
    ],
  });
};

export const createCabinRepository = async (cabinData) => {
  return await Cabins.create(cabinData);
};

export const updateCabinRepository = async (id, cabinData) => {
  return await Cabins.update(cabinData, { where: { idCabin: id } });
};

export const deleteCabinRepository = async (id) => {
  return await Cabins.destroy({ where: { idCabin: id } });
};


export const getComfortsByCabinIdRepository = async (cabinId) => {
  return await CabinsComforts.findAll({ 
    where: { idCabin: cabinId }  
  });
};
export const getComfortsToCabinRepository = async () =>{
  return await CabinsComforts.findAll({
    include: [
      {
        model: Cabins,
        attributes: ['name'], // Incluimos el nombre de la cabaña
      },
      {
        model: Comforts,
        attributes: ['name'], // Incluimos el nombre de la comodidad
      }
    ]

  });
}
export const addComfortToCabinRepository = async (cabinComfortData) => {
  return await CabinsComforts.create(cabinComfortData);
};

export const updateComfortToCabinRepository = async (id, cabinComfortData) => {
  return await CabinsComforts.update(cabinComfortData, { where: { idCabinComfort: id } });
};

export const deleteComfortToCabinRepository = async (id) => {
  return await CabinsComforts.destroy({ where: { idCabinComfort: id } });
};
