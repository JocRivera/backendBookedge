import { validationResult } from "express-validator";
import {
  getAllBedroomsService,
  getBedroomByIdService,
  createBedroomService,
  updateBedroomService,
  deleteBedroomService,
} from "../services/Bedrom_Service.js";

import { getBedroomsWithoutComfortsService } from "../services/BedroomComfort_Service.js";

export const getAllBedroomsController = async (req, res) => {
  try {
    const bedrooms = await getAllBedroomsService();
    res.status(200).json(bedrooms);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getBedroomByIdController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const bedroom = await getBedroomByIdService(req.params.id);
    res.status(200).json(bedroom);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const createBedroomController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const bedroomData = {
      ...req.body,
      imagen: req.file ? req.file.filename : null,
    };
    const bedroom = await createBedroomService(bedroomData);
    res.status(201).json(bedroom);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateBedroomController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // 1. Obtener la habitación existente
    const existingBedroom = await getBedroomByIdService(req.params.id);
    if (!existingBedroom) {
      return res.status(404).json({ message: "Habitación no encontrada" });
    }

    // 2. Preparar datos actualizados
    const bedroomData = {
      name: req.body.name || existingBedroom.name,
      description: req.body.description || existingBedroom.description,
      capacity: req.body.capacity || existingBedroom.capacity,
      status: req.body.status || existingBedroom.status,
      ...(req.file && { imagen: req.file.filename }),
    };

    if (!req.file) {
      delete bedroomData.imagen;
    }

    // 3. Actualizar
    const updatedBedroom = await updateBedroomService(req.params.id, bedroomData);
    res.status(200).json(updatedBedroom);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteBedroomController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const idBedroom = req.params.id;

    const relatedData = await getBedroomsWithoutComfortsService(idBedroom);
    if (relatedData.length > 0) {
      return res.status(400).json({
        message: "No se puede eliminar la habitación porque tiene datos relacionados",
      });
    }

    await deleteBedroomService(idBedroom);
    res.status(200).json({ message: "Habitación eliminada correctamente" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
