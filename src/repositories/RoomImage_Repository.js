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
  // Paso 1: Establece todas las imágenes de esta habitación como no primarias.
  await RoomImages.update(
    { isPrimary: false },
    { where: { idRoom: roomId } }
  );
  
  // Paso 2: Establece la imagen seleccionada como la única primaria.
  return await RoomImages.update(
    { isPrimary: true },
    { where: { idRoomImage: imageId } }
  );
};