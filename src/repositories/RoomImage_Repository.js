import { RoomImages } from "../models/RoomImage_Model.js";

export const getRoomImagesRepository = async (roomId) => {
  return await RoomImages.findAll({ 
    where: { idRoom: roomId },
    order: [['isPrimary', 'DESC']]
  });
};

export const getRoomImageByIdRepository = async (imageId) => {
  return await RoomImages.findByPk(imageId);
};

export const createRoomImageRepository = async (imageData) => {
  return await RoomImages.create(imageData);
};

export const deleteRoomImageRepository = async (id) => {
  return await RoomImages.destroy({ where: { idRoomImage: id } });
};

export const setPrimaryImageRepository = async (roomId, imageId) => {
  const image = await RoomImages.findOne({
    where: {
      idRoomImage: image,
      idRoom: roomId
    }
  });
    
  await RoomImages.update(
    { isPrimary: false },
    { where: { idRoom: roomId } }
  );
  
  // Establece la imagen seleccionada como primaria
  return await RoomImages.update(
    { isPrimary: true },
    { where: { idRoomImage: imageId } }
  );
};