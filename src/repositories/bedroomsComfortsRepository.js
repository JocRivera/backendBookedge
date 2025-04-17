import { BedroomsComforts } from "../models/Bedrooms_Comforts.js";
import { Bedrooms } from "../models/Bedrooms_Model.js";
import { Comforts } from "../models/Comfort_Model.js";
import { Op } from "sequelize";

export const assignComfortsToBedroomRepository = async ({ idRoom, comforts, description }) => {
  const now = new Date();
  const dataToInsert = comforts.map((idComfort) => ({
    idRoom,
    idComfort,
    description,
    dateEntry: now,
  }));
  return await BedroomsComforts.bulkCreate(dataToInsert);
};

export const getBedroomsWithoutComfortsRepository = async () => {
  const assigned = await BedroomsComforts.findAll({
    attributes: ["idRoom"],
    group: ["idRoom"],
  });
  const assignedIds = assigned.map((item) => item.idRoom);
  return await Bedrooms.findAll({
    where: {
      idRoom: {
        [Op.notIn]: assignedIds,
      },
    },
  });
};

export const getAllComfortsForBedroomsRepository = async () => {
  return await BedroomsComforts.findAll({
    include: [
      { model: Bedrooms, attributes: ["idRoom", "name", "imagen"] },
      { model: Comforts, attributes: ["idComfort", "name"] },
    ],
  });
};

export const getGroupedComfortsByBedroomRepository = async (idRoom) => {
  const comforts = await BedroomsComforts.findAll({
    where: { idRoom },
    include: [{ model: Comforts, attributes: ["name"] }],
  });
  return {
    description: comforts[0]?.description,
    dateEntry: comforts[0]?.dateEntry,
    comforts: comforts.map((c) => c.Comfort.name),
  };
};

export const updateGroupedComfortsByBedroomRepository = async ({ idRoom, comforts, description }) => {
  const now = new Date();
  await BedroomsComforts.destroy({ where: { idRoom } });
  const dataToInsert = comforts.map((idComfort) => ({
    idRoom,
    idComfort,
    description,
    dateEntry: now,
  }));
  return await BedroomsComforts.bulkCreate(dataToInsert);
};