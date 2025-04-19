import { BedroomsComforts } from "../models/Bedrooms_Comforts.js";
import { Bedrooms } from "../models/bedrooms_Model.js";
import { Comforts } from "../models/comfort_Model.js";
import { RoomImages } from "../models/RoomImage_Model.js";
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
        [Op.notIn]: assignedIds.length > 0 ? assignedIds : [0],
      },
    },
    include: [{
      model: RoomImages,
      as: "images",
      attributes: ["idRoomImage", "imagePath"],
      where: { isPrimary: true },
      required: false
    }]
  });
};

// En bedroomsComforts_Repository.js
export const getAllComfortsForBedroomsRepository = async () => {
  return await BedroomsComforts.findAll({
    include: [
      { 
        model: Bedrooms, 
        attributes: ["idRoom", "name"],
        include: [{
          model: RoomImages,
          as: "images",  // <-- Añade esta línea
          attributes: ["idRoomImage", "imagePath"],
          where: { isPrimary: true },
          required: false
        }]
      },
      { 
        model: Comforts, 
        attributes: ["idComfort", "name"] 
      },
    ],
  });
};

export const getGroupedComfortsByBedroomRepository = async (idRoom) => {
  const comforts = await BedroomsComforts.findAll({
    where: { idRoom },
    include: [{ model: Comforts, attributes: ["name"] }
  ],
  });
  
  if (comforts.length === 0) {
    return {
      description: null,
      dateEntry: null,
      comforts: []
    };
  }
  
  return {
    description: comforts[0].description,
    dateEntry: comforts[0].dateEntry,
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