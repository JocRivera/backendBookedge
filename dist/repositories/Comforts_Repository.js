import { Comforts } from "../models/comfort_Model.js";

export const getAllComforts = async (orderBy = 'idComfort', orderDirection = 'ASC') => {
  return await Comforts.findAll({
    order: [[orderBy, orderDirection]],
  });
};


export const getComfortById = async (id) => {
  return await Comforts.findByPk(id);
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


