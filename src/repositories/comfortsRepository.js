import { Comforts } from "../models/Model_Comfort.js";

export const getAllComforts = async () => {
    return await Comforts.findAll();
};


export const getComfortById = async (id) => {
    return await Comforts.findOne({ where: { id_comfort: id } });
};

export const createComfort = async (data) => {
  try {
    return await Comforts.create(data);
  } catch (error) {
    console.error("Error en createComfort:", error);
  }
};

export const updateComfort = async (id, data) => {
  return await Comforts.update(data, {
    where: { id_comfort: id },
  });
};

export const deleteComfort = async (id) => {
 return await Comforts.destroy({ where: { id_comfort: id } });
};
