import { Bedrooms } from "../models/Bedrooms_Model.js";
import { Comforts } from "../models/comfort_Model.js";
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
        attributes: ["idRoomImage", "imagePath"],
        where: { isPrimary: true },
        required: false,
      },
    ],
  });
  
  return bedrooms.map(bedroom => {
    const plainBedroom = bedroom.get({ plain: true });
    plainBedroom.imageCount = plainBedroom.images ? plainBedroom.images.length : 0;
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
        through: { attributes: [] },
      },
      {
        model: RoomImages,
        as: "images",
        attributes: ["idRoomImage", "imagePath", "isPrimary"],
      },
    ],
  });
};

export const createBedroomRepository = async (bedroomData) => {
  return await Bedrooms.create(bedroomData);
};

export const updateBedroomRepository = async (id, bedroomData) => {
  const [updated] = await Bedrooms.update(bedroomData, { 
    where: { idRoom: id }
  });
  
  if (updated) {
    const updatedBedroom = await getBedroomByIdRepository(id);
    return updatedBedroom;
  }
  
  return null;
};

export const deleteBedroomRepository = async (id) => {
  return await Bedrooms.destroy({ where: { idRoom: id } });
};
