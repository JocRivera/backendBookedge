import { Cabins } from "../models/Cabin_Model.js";
import { Comforts } from "../models/Comfort_Model.js";

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


