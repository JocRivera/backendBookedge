import { validationResult } from "express-validator";
import {
  getCabinImagesService,
  createCabinImageService,
  deleteCabinImageService,
  setPrimaryImageService
} from "../services/CabinImage_Service.js";

export const getCabinImagesController = async (req, res) => {
  try {
    const images = await getCabinImagesService(req.params.cabinId);
    res.status(200).json(images);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const uploadCabinImagesController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  try {
    const cabinId = req.params.cabinId;
    const files = req.files;
    const images = [];
    
    // Determinar si estas serán las primeras imágenes para esta cabaña
    const existingImages = await getCabinImagesService(cabinId);
    const noExistingImages = existingImages.length === 0;
    
    for (let i = 0; i < files.length; i++) {
      const imageData = {
        idCabin: cabinId,
        imagePath: files[i].filename,
        isPrimary: noExistingImages && i === 0 // La primera imagen es primaria solo si no hay imágenes existentes
      };
      
      const image = await createCabinImageService(imageData);
      images.push(image);
    }
    
    res.status(201).json(images);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteCabinImageController = async (req, res) => {
  try {
    await deleteCabinImageService(req.params.imageId);
    res.status(200).json({ message: "Imagen eliminada correctamente" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const setPrimaryImageController = async (req, res) => {
  try {
    await setPrimaryImageService(req.params.cabinId, req.params.imageId);
    res.status(200).json({ message: "Imagen principal actualizada" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};