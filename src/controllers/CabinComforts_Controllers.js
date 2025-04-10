import { validationResult } from "express-validator";
import {
  assignComfortsToCabinService,
  getCabinsWithoutComfortsService,
  getAllComfortsForCabinsService,
  getGroupedComfortsByCabinService,
  updateGroupedComfortsByCabinService
} from "../services/CabinComfort_Service.js";

// 🔄 Asignar comodidades a una cabaña
export const assignComfortsToCabinController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { idCabin, comforts, description } = req.body;
    await assignComfortsToCabinService({ idCabin, comforts, description });
    res.status(200).json({ message: "Comodidades asignadas correctamente" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 🔍 Cabañas sin comodidades asignadas
export const getCabinsWithoutComfortsController = async (req, res) => {
  try {
    const cabins = await getCabinsWithoutComfortsService();
    res.status(200).json(cabins);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 📦 Ver todas las comodidades de todas las cabañas
export const getAllComfortsForCabinsController = async (req, res) => {
  try {
    const data = await getAllComfortsForCabinsService();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 🔍 Ver las comodidades agrupadas por una cabaña específica
export const getGroupedComfortsByCabinController = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getGroupedComfortsByCabinService(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 📝 Actualizar las comodidades asignadas a una cabaña
export const updateGroupedComfortsByCabinController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { idCabin, comforts, description } = req.body;
    await updateGroupedComfortsByCabinService({ idCabin, comforts, description });
    res.status(200).json({ message: "Comodidades actualizadas correctamente" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
