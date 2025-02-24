import { Cabins } from "../models/Cabin_Model.js";
import { Comforts } from "../models/Comfort_Model.js";
import { Cabins_Comforts } from "../models/Cabins_Comforts.js";

export const getAllCabins = async () => {
  try {
    return await Cabins.findAll({
      include: [{ model: Comforts, as: "Comforts" }],
    });
  } catch (error) {
    console.error("Error en getAllCabins:", error);
    throw error;
  }
};

export const getCabinById = async (id) => {
  try {
    const cabin = await Cabins.findByPk(id, {
      include: [{ model: Comforts, as: "Comforts" }],
    });
    if (!cabin) {
      throw new Error("Cabaña no encontrada");
    }
    return cabin;
  } catch (error) {
    console.error("Error en getCabinById:", error);
    throw error;
  }
};

export const createCabin = async (cabinData) => {
  try {
    return await Cabins.create(cabinData);
  } catch (error) {
    console.error("Error en createCabin:", error);
    throw error;
  }
};

export const updateCabin = async (id, cabinData) => {
  try {
    const [updated] = await Cabins.update(cabinData, {
      where: { id_cabin: id },
    });
    if (!updated) {
      throw new Error("Cabaña no encontrada");
    }
    return updated;
  } catch (error) {
    console.error("Error en updateCabin:", error);
    throw error;
  }
};

export const deleteCabin = async (id) => {
  try {
    const deleted = await Cabins.destroy({ where: { id_cabin: id } });
    if (!deleted) {
      throw new Error("Cabaña no encontrada");
    }
    return deleted;
  } catch (error) {
    console.error("Error en deleteCabin:", error);
    throw error;
  }
};

export const addComforts = async (id, comfortId, status = true, Date_entry) => {
  try {
    const cabin = await Cabins.findByPk(id);
    const comfort = await Comforts.findByPk(comfortId);
    if (!cabin || !comfort) {
      throw new Error("Cabaña o comodidad no encontrada");
    }
    return await Cabins_Comforts.create({
      Id_Cabin: id,
      Id_Comfort: comfortId,
      Date_entry: Date_entry || new Date(),
      Status: status,
    });
  } catch (error) {
    console.error("Error en addComforts:", error);
    throw error;
  }
};


export const deleteComforts = async (cabinId, comfortId) => {
  try {
    const relation = await Cabins_Comforts.findOne({
      where: { id_cabin: cabinId, id_comfort: comfortId },
    });
    if (!relation) {
      throw new Error("Relación no encontrada");
    }
    return await Cabins_Comforts.destroy({
      where: { id_cabin: cabinId, id_comfort: comfortId },
    });
  } catch (error) {
    console.error("Error en deleteComforts:", error);
    throw error;
  }
};
