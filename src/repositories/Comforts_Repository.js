import { Comforts } from "../models/Comfort_Model.js";

export const getAllComforts = async () => {
  return await Comforts.findAll();
};

export const getComfortById = async (id) => {
  return await Comforts.findByPk({ where: { idComfort: id } });
};

export const createComfort = async (data) => {
  return await Comforts.create(data);
};

export const updateComfort = async (id, data) => {
  return await Comforts.update(data, { where: { idComfort: id } });
};

export const deleteComfort = async (id) => {
  return await Comforts.destroy({ where: { idComfort: id } });
};


