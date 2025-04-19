// CabinImage_Service.js
import {
    getCabinImagesRepository,
    createCabinImageRepository,
    deleteCabinImageRepository,
    setPrimaryImageRepository
  } from "../repositories/CabinImage_Repository.js";
  
  export const getCabinImagesService = async (cabinId) => {
    return await getCabinImagesRepository(cabinId);
  };
  
  export const createCabinImageService = async (imageData) => {
    return await createCabinImageRepository(imageData);
  };
  
  export const deleteCabinImageService = async (id) => {
    return await deleteCabinImageRepository(id);
  };
  
  export const setPrimaryImageService = async (cabinId, imageId) => {
    return await setPrimaryImageRepository(cabinId, imageId);
  };