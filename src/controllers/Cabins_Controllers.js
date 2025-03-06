import { validationResult } from "express-validator";
import {
  getAllCabinsService,
  getCabinByIdService,
  createCabinService,
  updateCabinService,
  deleteCabinService,
  addComfortsService,
  updateComfortsService,
  deteleComfortCabinService,
  changeStatusCabinService,
} from "../services/Cabin_Services.js";

export const getAllCabins = async (req, res) => {
  try {
    const cabins = await getAllCabinsService();
    res.status(200).json(cabins);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getCabinById = async (req, res) => {
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

export const createCabin = async (req, res) => {
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

export const updateCabin = async (req, res) => {
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

export const deleteCabin = async (req, res) => {
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

export const changeStatusCabin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    await changeStatusCabinService(req.params.id, req.body.status);
    res.status(200).end();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllCabinComfort = async (req, res) => {
  try {
    const comfortData = await getAllCabinComfort();
    res.status(200).json(comfortData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const addComforts = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { idCabin, idComfort } = req.params;
    const { description, dateEntry } = req.body;

    await addComfortsService(idCabin, idComfort, description, dateEntry);
    res.status(200).json({ message: "Comodidad agregada correctamente" });
  } catch (error) {
    console.error("Error al agregar comodidad:", error);
    res.status(400).json({ message: error.message });
  }
};
export const updateComfort = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { idCabinComfort } = req.params;
    const { description, dateEntry } = req.body;
    await updateComfortsService(idCabinComfort, description, dateEntry);
    res.status(200).json({ message: "Comodidad actualizada correctamente" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const deleteComfort = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { idCabinComfort } = req.params;
    await deteleComfortCabinService(idCabinComfort);
    res.status(200).end();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
