import { validationResult } from "express-validator";
import {
  getAllBedroomsService,
  getBedroomByIdService,
  createBedroomService,
  updateBedroomService,
  deleteBedroomService,
  updateBedroomComfortService,
  removeComfortFromBedroomService,
} from "../services/Bedrom_Service.js";

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
    const bedroomData = {
      ...req.body,
      imagen: req.file ? req.file.filename : null,
    };
    const bedroom = await updateBedroomService(req.params.id, bedroomData);
    res.status(200).json(bedroom);
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
    await deleteBedroomService(req.params.id);
    res.status(200).end();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const addComfortToBedroomController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const bedroomComfortData = req.body;
    await addComfortToBedroomService(bedroomComfortData);
    res.status(200).json({ message: "Comodidad agregada correctamente" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateComfortToBedroomController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { idRoomComforts } = req.params; 
    const comfortData = req.body;
    await updateBedroomComfortService(idRoomComforts, comfortData);
    res.status(200).json({ message: "Comodidad actualizada correctamente" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const removeComfortFromBedroomController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { idRoomComforts } = req.params; 
    await removeComfortFromBedroomService(idRoomComforts);
    res.status(200).json({ message: "Comodidad eliminada correctamente" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

