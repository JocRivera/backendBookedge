import { validationResult } from "express-validator";
import {
  getAllBedromService,
  getBeedromByIdService,
  getBeedroomWithComfortsService,
  createBeedroomService,
  updateBeedroomService,
  deleteBeedroomService,
  changeStatusBeedroomService,
  addComfortToBeedroomService,
  updateBeedroomComfortService,
  removeComfortFromBeedroomService,
} from "../services/Bedrom_Service.js";

export const getAllBedrooms = async (req, res) => {
  try {
    const bedrooms = await getAllBedromService();
    res.status(200).json(bedrooms);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getBedroomById = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const bedroom = await getBeedromByIdService(req.params.id);
    res.status(200).json(bedroom);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getBedroomWithComforts = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const bedroom = await getBeedroomWithComfortsService(req.params.id);
    res.status(200).json(bedroom);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const createBedroom = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const bedroomData = {
      ...req.body,
      imagen: req.file ? req.file.filename : null,
    };
    const bedroom = await createBeedroomService(bedroomData);
    res.status(201).json(bedroom);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateBedroom = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const bedroomData = {
      ...req.body,
      imagen: req.file ? req.file.filename : null,
    };
    const bedroom = await updateBeedroomService(req.params.id, bedroomData);
    res.status(200).json(bedroom);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteBedroom = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    await deleteBeedroomService(req.params.id);
    res.status(200).end();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const changeStatusBedroom = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    await changeStatusBeedroomService(req.params.id, req.body.status);
    res.status(200).end();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const addComfortToBedroom = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    await addComfortToBeedroomService(req.body);
    res.status(200).json({ message: "Comodidad agregada correctamente" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const updateBedroomComfort = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { idRoomComforts } = req.params;
    const { ...otherData } = req.body;
    await updateBeedroomComfortService(idRoomComforts, otherData);
    res.status(200).json({ message: "Comodidad actualizada correctamente" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const removeComfortFromBedroom = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { idRoomComforts } = req.params;
    await removeComfortFromBeedroomService(idRoomComforts);
    res.status(200).json({ message: "Comodidad eliminada correctamente" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
