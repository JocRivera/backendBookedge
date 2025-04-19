import { validationResult } from "express-validator";
import {
  getRoomImagesService,
  getRoomImageByIdService,
  createRoomImageService,
  deleteRoomImageService, 
  setPrimaryImageService,
} from "../services/RoomImage_Service.js";

export const getRoomImagesController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
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
    
    if (!files || files.length === 0) {
      return res.status(400).json({ message: "No se han proporcionado imágenes" });
    }
    
    const images = [];
    
    // Determinar si estas serán las primeras imágenes para esta habitación
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
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  try {
    const imageId = req.params.imageId;
    const image = await getRoomImageByIdService(imageId);
    
    if (!image) {
      return res.status(404).json({ message: "Imagen no encontrada" });
    }
    
    await deleteRoomImageService(imageId);
    res.status(200).json({ message: "Imagen eliminada correctamente" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const setPrimaryImageController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  try {
    const roomId = req.params.roomId;
    const imageId = req.params.imageId;
    
    await setPrimaryImageService(roomId, imageId);
    res.status(200).json({ message: "Imagen principal actualizada" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};