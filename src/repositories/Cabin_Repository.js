import { Cabins } from "../models/Cabin_Model.js";
import { Comforts } from "../models/Comfort_Model.js";
import { CabinsComforts } from "../models/Cabins_Comforts.js";

export const getAllCabins = async () => {
  return await Cabins.findAll({
    include: [{ model: Comforts, as: "Comforts" }],
  });
};

export const getCabinById = async (id) => {
  return await Cabins.findByPk(id, {
    include: [{ model: Comforts, as: "Comforts" }],
  });
};

export const createCabin = async (cabinData) => {
  return await Cabins.create(cabinData);
};

export const updateCabin = async (id, cabinData) => {
  const [updated] = await Cabins.update(cabinData, {
    where: { idCabin: id },
  });
  return updated;
};

export const deleteCabin = async (id) => {
  return await Cabins.destroy({ where: { idCabin: id } });
};

export const changeStatusCabin = async (id, status) => {
  return await Cabins.update({ status }, { where: { idCabin: id } });
};

export const addComforts = async (
  idCabin,
  idComfort,
  description,
  dateEntry = new Date()
) => {
  const cabin = await Cabins.findByPk(idCabin);
  return await cabin.addComfort(idComfort, {
    through: { description, status, dateEntry },
  });
};


export const updateComforts = async (idCabin, idComfort, description, dateEntry) => {
  return await CabinsComforts.update(
    { description, dateEntry },
    {
      where: { idCabin: idCabin, idComfort: idComfort },
    }
  );
};

