import { RoomImages } from "../models/RoomImage_Model.js";

export const getRoomImagesRepository = async (roomId) => {
  return await RoomImages.findAll({ 
    where: { idRoom: roomId },
    order: [['isPrimary', 'DESC']]
  });
};

export const createRoomImageRepository = async (imageData) => {
  return await RoomImages.create(imageData);
};

export const deleteRoomImageRepository = async (id) => {
  return await RoomImages.destroy({ where: { idRoomImage: id } });
};

export const setPrimaryImageRepository = async (roomId, imageId) => {
  // Primero, establece todas las imágenes como no primarias
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