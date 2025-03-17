import { validationResult } from "express-validator";
import {
  getAllCabinsService,
  getCabinByIdService,
  createCabinService,
  updateCabinService,
  deleteCabinService,
  getComfortsToCabinService,
  addComfortToCabinService,
  updateComfortToCabinService,
  deleteComfortToCabinService,
} from "../services/Cabin_Services.js";

export const getAllCabinsController = async (req, res) => {
  try {
    const cabins = await getAllCabinsService();
    res.status(200).json(cabins);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getCabinByIdController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const cabin = await getCabinByIdService(req.params.id);
    res.status(200).json(cabin);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const createCabinController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const cabinData = {
      ...req.body,
      imagen: req.file ? req.file.filename : null,
    };
    const cabin = await createCabinService(cabinData);
    res.status(201).json(cabin);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateCabinController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const cabinData = {
      ...req.body,
      imagen: req.file ? req.file.filename : null,
    };
    const cabin = await updateCabinService(req.params.id, cabinData);
    res.status(200).json(cabin);
    console.log(cabin);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteCabinController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    await deleteCabinService(req.params.id);
    res.status(200).end();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getComfortsToCabinController = async (req, res) => {
  try {
    const cabinsComforts = await getComfortsToCabinService();
    res.status(200).json(cabinsComforts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const addComfortToCabinController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const cabinComfortData = req.body;
    await addComfortToCabinService(cabinComfortData);
    res.status(200).json({ message: "Comodidad agregada correctamente" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateComfortToCabinController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { idCabinComfort } = req.params;
    const cabinComfortData = req.body;
    await updateComfortToCabinService(idCabinComfort, cabinComfortData);
    res.status(200).json({ message: "Comodidad actualizada correctamente" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const deleteComfortToCabinController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { idCabinComfort } = req.params;
    await deleteComfortToCabinService(idCabinComfort);
    res.status(200).end();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
