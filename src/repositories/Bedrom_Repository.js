import { Bedrooms } from "../models/bedrooms_Model.js";
import { Comforts } from "../models/Comfort_Model.js";
import { RoomImages } from "../models/RoomImage_Model.js";

export const getAllBedroomsRepository = async () => {
  const bedrooms = await Bedrooms.findAll({
    include: [
      {
        model: Comforts,
        as: "Comforts",
        attributes: ["idComfort", "name"],
        through: { attributes: [] },
      },
      {
        model: RoomImages,
        as: "images",
        attributes: ["idRoomImage"],
      },
    ],
  });
  
  return bedrooms.map(bedroom => {
    const plainBedroom = bedroom.get({ plain: true });
    plainBedroom.imageCount = plainBedroom.images ? plainBedroom.images.length : 0;
    delete plainBedroom.images; 
    return plainBedroom;
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