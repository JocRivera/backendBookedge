import { Bedrooms } from "../models/bedrooms_Model.js";
import { Comforts } from "../models/Comfort_Model.js";
import { BedroomsComforts } from "../models/Bedrooms_Comforts.js";

export const getAllBedroomsRepository = async () => {
  return await Bedrooms.findAll({
    include: [
      {
        model: Comforts,
        as: "Comforts",
        attributes: ["idComfort", "name"],
        through: { attributes: [] },
      },
    ],
  });
};

export const getBedroomByIdRepository = async (id) => {
  return await Bedrooms.findByPk(id, {
    include: [
      {
        model: Comforts,
        as: "Comforts",
        attributes: ["idComfort", "name"],
      },
    ],
  });
};

export const createBedroomRepository = async (bedroomData) => {
  return await Bedrooms.create(bedroomData);
};

export const updateBedroomRepository = async (id, bedroomData) => {
  return await Bedrooms.update(bedroomData, { where: { idRoom: id } });
};

export const deleteBedroomRepository = async (id) => {
  return await Bedrooms.destroy({ where: { idRoom: id } });
};


export const getAllComfortToBedroomRepository = async ()=>{
  return await BedroomsComforts.findAll();
}

export const addComfortToBedroomRepository = async (bedroomComfortData) => {
  return await BedroomsComforts.create(bedroomComfortData);
};

export const updateBedroomComfortRepository = async (idRoomComforts, updateData) => {
  return await BedroomsComforts.update(updateData, {
    where: { idRoomComforts },
  });
};

export const removeComfortFromBedroomRepository = async (idRoomComforts) => {
  return await BedroomsComforts.destroy({
    where: { idRoomComforts },
  });
};
