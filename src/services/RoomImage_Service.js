import { 
    getRoomImagesRepository,
    getRoomImageByIdRepository,
    createRoomImageRepository,
    deleteRoomImageRepository,
    setPrimaryImageRepository 
  } from "../repositories/RoomImage_Repository.js"
  
  export const getRoomImagesService = async (roomId) => {
    return await getRoomImagesRepository(roomId);
  };
  
  export const getRoomImageByIdService = async (imageId) => {
    return await getRoomImageByIdRepository(imageId);
  };
  
  export const createRoomImageService = async (imageData) => {
    return await createRoomImageRepository(imageData);
  };
  
  export const deleteRoomImageService = async (id) => {
    return await deleteRoomImageRepository(id);
  };
  
  export const setPrimaryImageService = async (roomId, imageId) => {
    return await setPrimaryImageRepository(roomId, imageId);
  };