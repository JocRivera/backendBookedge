import { Comforts } from "../models/Comfort_Model.js";

export const getAllComforts = async () => {
  try {
    return await Comforts.findAll();
  } catch (error) {
    console.error("Error en getAllComforts:", error);
  }
};

export const getComfortById = async (id) => {
  try {
    return await Comforts.findOne({ where: { id_comfort: id } });
  } catch (error) {
    console.log("Error en getComfortById:", error);
  }
};

export const createComfort = async (data) => {
  try {
    return await Comforts.create(data);
  } catch (error) {
    console.error("Error en createComfort:", error);
  }
};

export const updateComfort = async (id, data) => {
  try {
    return await Comforts.update(data, {where: { id_comfort: id },});
  } catch (error) {
    console.error("Error en updateComfort:", error);
  }
};

export const deleteComfort = async (id) => {
  try {
    return await Comforts.destroy({ where: { id_comfort: id } });
  } catch (error) {
    console.error("Error en deleteComfort:", error);
  }
};
