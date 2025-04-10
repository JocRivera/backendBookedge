import { CabinsComforts } from "../models/Cabins_Comforts.js";
import { Cabins } from "../models/Cabin_Model.js";
import { Comforts } from "../models/Comfort_Model.js";
import { Op } from "sequelize";

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
  
  // 🔍 Ver cabañas sin comodidades asignadas
  export const getCabinsWithoutComfortsRepository = async () => {
    const assigned = await CabinsComforts.findAll({
      attributes: ['idCabin'],
      group: ['idCabin'],
    });
    const assignedIds = assigned.map(item => item.idCabin);
    return await Cabins.findAll({
      where: {
        idCabin: {
          [Op.notIn]: assignedIds,
        },
      },
    });
  };
  
  export const getAllComfortsForCabinsRepository = async () => {
    return await CabinsComforts.findAll({
      include: [
        { model: Cabins, attributes: ['idCabin', 'name','imagen'] },
        { model: Comforts, attributes: ['idComfort', 'name'] }
      ]
    });
  };
  
  export const getGroupedComfortsByCabinRepository = async (idCabin) => {
    const comforts = await CabinsComforts.findAll({
      where: { idCabin },
      include: [{ model: Comforts, attributes: ['name'] }],
    });
    return {
      description: comforts[0]?.description ,
      dateEntry: comforts[0]?.dateEntry ,
      comforts: comforts.map((c) => c.Comfort.name),
    };
  };
  
  export const updateGroupedComfortsByCabinRepository = async ({ idCabin, comforts, description }) => {
    const now = new Date();
  
    // 1. Eliminar todas las comodidades actuales de la cabaña
    await CabinsComforts.destroy({ where: { idCabin } });
  
    // 2. Insertar nuevas comodidades
    const dataToInsert = comforts.map((idComfort) => ({
      idCabin,
      idComfort,
      description,
      dateEntry: now,
    }));
  
    return await CabinsComforts.bulkCreate(dataToInsert);
  };
  
  