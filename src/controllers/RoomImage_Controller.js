import { validationResult } from "express-validator";
import {
  getRoomImagesService,
  createRoomImageService,
  deleteRoomImageService, 
  setPrimaryImageService,
} from "../services/RoomImage_Service.js";

export const getRoomImagesController = async (req, res) => {
  try {
    const images = await getRoomImagesService(req.params.roomId);
    res.status(200).json(images);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const uploadRoomImagesController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  try {
    const roomId = req.params.roomId; 
    const files = req.files;
    const images = [];
    
    // Determinar si estas serán las primeras imágenes para esta cabaña
    const existingImages = await getRoomImagesService(roomId);
    const noExistingImages = existingImages.length === 0;
    
    for (let i = 0; i < files.length; i++) {
      const imageData = {
        idRoom: roomId, 
        imagePath: files[i].filename,
        isPrimary: noExistingImages && i === 0 // La primera imagen es primaria solo si no hay imágenes existentes
      };
      
      const image = await createRoomImageService(imageData);
      images.push(image);
    }
    
    res.status(201).json(images);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const deleteRoomImageController = async (req, res) => {
  try {
    await deleteRoomImageService(req.params.imageId);
    res.status(200).json({ message: "Imagen eliminada correctamente" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const setPrimaryImageController = async (req, res) => {
  try {
    await setPrimaryImageService(req.params.roomId, req.params.imageId);
    res.status(200).json({ message: "Imagen principal actualizada" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};