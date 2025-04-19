import { CabinsComforts } from "../models/Cabins_Comforts.js";
import { Cabins } from "../models/Cabin_Model.js";
import { Comforts } from "../models/Comfort_Model.js";
import { CabinImages } from "../models/CabinImage_Model.js";
import { Op } from "sequelize";

// Asignar comodidades a cabaña (con descripción y fecha)
export const assignComfortsToCabinRepository = async ({ idCabin, comforts, description }) => {
  const now = new Date();
  const dataToInsert = comforts.map((idComfort) => ({
    idCabin,
    idComfort,
    description,
    dateEntry: now,
  }));
  return await CabinsComforts.bulkCreate(dataToInsert);
};

// Obtener cabañas sin comodidades asignadas (incluye imagen primaria)
export const getCabinsWithoutComfortsRepository = async () => {
  const assigned = await CabinsComforts.findAll({
    attributes: ["idCabin"],
    group: ["idCabin"],
  });
  const assignedIds = assigned.map((item) => item.idCabin);
  return await Cabins.findAll({
    where: {
      idCabin: {
        [Op.notIn]: assignedIds.length > 0 ? assignedIds : [0],
      },
    },
    include: [{
      model: CabinImages,
      as: "images",
      attributes: ["idCabinImage", "imagePath"],
      where: { isPrimary: true },
      required: false,
    }],
  });
};

// Obtener todas las comodidades asignadas a cabañas (con datos de cabaña e imagen primaria)
export const getAllComfortsForCabinsRepository = async () => {
  return await CabinsComforts.findAll({
    include: [
      { 
        model: Cabins, 
        attributes: ["idCabin", "name"],
        include: [{
          model: CabinImages,
          as: "images",
          attributes: ["idCabinImage", "imagePath"],
          where: { isPrimary: true },
          required: false,
        }],
      },
      { 
        model: Comforts, 
        attributes: ["idComfort", "name"],
      },
    ],
  });
};

// Obtener comodidades agrupadas por cabaña (con manejo de casos vacíos)
export const getGroupedComfortsByCabinRepository = async (idCabin) => {
  const comforts = await CabinsComforts.findAll({
    where: { idCabin },
    include: [{ 
      model: Comforts, 
      attributes: ["name"],
    }],
  });
  
  if (comforts.length === 0) {
    return {
      description: null,
      dateEntry: null,
      comforts: [],
    };
  }
  
  return {
    description: comforts[0].description,
    dateEntry: comforts[0].dateEntry,
    comforts: comforts.map((c) => c.Comfort.name),
  };
};

// Actualizar comodidades de una cabaña (elimina anteriores y crea nuevas)
export const updateGroupedComfortsByCabinRepository = async ({ idCabin, comforts, description }) => {
  const now = new Date();
  await CabinsComforts.destroy({ where: { idCabin } });
  const dataToInsert = comforts.map((idComfort) => ({
    idCabin,
    idComfort,
    description,
    dateEntry: now,
  }));
  return await CabinsComforts.bulkCreate(dataToInsert);
};