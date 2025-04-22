import { validationResult } from "express-validator";
import {
  getAllBedroomsService,
  getBedroomByIdService,
  createBedroomService,
  updateBedroomService,
  deleteBedroomService,
} from "../services/Bedrom_Service.js";
import { getGroupedComfortsByBedroomService } from "../services/BedroomComfort_Service.js";

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
    if (!bedroom) {
      return res.status(404).json({ message: "Habitación no encontrada" });
    }
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
      name: req.body.name,
      description: req.body.description,
      capacity: req.body.capacity,
      status: req.body.status || "En Servicio",
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
    const existingBedroom = await getBedroomByIdService(req.params.id);
    if (!existingBedroom) {
      return res.status(404).json({ message: "Habitación no encontrada" });
    }

    const bedroomData = {
      name: req.body.name || existingBedroom.name,
      description: req.body.description || existingBedroom.description,
      capacity: req.body.capacity || existingBedroom.capacity,
      status: req.body.status || existingBedroom.status,
    };

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
    const comfortsInfo = await getGroupedComfortsByBedroomService(idBedroom);
    
    if (comfortsInfo.comforts && comfortsInfo.comforts.length > 0) {
      return res.status(400).json({
        message: "No se puede eliminar la habitación porque tiene comodidades asignadas",
      });
    }

    await deleteBedroomService(idBedroom);
    res.status(200).json({ message: "Habitación eliminada correctamente" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};