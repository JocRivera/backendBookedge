import { validationResult } from "express-validator";
import {
  assignComfortsToBedroomService,
  getBedroomsWithoutComfortsService,
  getAllComfortsForBedroomsService,
  getGroupedComfortsByBedroomService,
  updateGroupedComfortsByBedroomService
} from "../services/BedroomComfort_Service.js";

export const assignComfortsToBedroomController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { idRoom, comforts, description } = req.body;
    await assignComfortsToBedroomService({ idRoom, comforts, description });
    res.status(200).json({ message: "Comodidades asignadas correctamente" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getBedroomsWithoutComfortsController = async (req, res) => {
  try {
    const bedrooms = await getBedroomsWithoutComfortsService();
    res.status(200).json(bedrooms);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllComfortsForBedroomsController = async (req, res) => {
  try {
    const data = await getAllComfortsForBedroomsService();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getGroupedComfortsByBedroomController = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getGroupedComfortsByBedroomService(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateGroupedComfortsByBedroomController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { idRoom, comforts, description } = req.body;
    await updateGroupedComfortsByBedroomService({ idRoom, comforts, description });
    res.status(200).json({ message: "Comodidades actualizadas correctamente" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};