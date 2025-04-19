import { validationResult } from "express-validator";
import {
  getAllCabinsService,
  getCabinByIdService,
  createCabinService,
  updateCabinService,
  deleteCabinService,
} from "../services/Cabin_Services.js";
import { getGroupedComfortsByCabinService } from "../services/CabinComfort_Service.js";

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
    // Ya no necesitamos manejar imágenes aquí
    const cabinData = {
      name: req.body.name,
      description: req.body.description,
      capacity: req.body.capacity,
      status: req.body.status || "En Servicio"
    };
    
    console.log("Datos a crear:", cabinData); // Para depuración
    
    const cabin = await createCabinService(cabinData);
    res.status(201).json(cabin);
  } catch (error) {
    console.error("Error en createCabinController:", error);
    res.status(400).json({ message: error.message });
  }
};

export const updateCabinController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // 1. Obtener la cabaña existente
    const existingCabin = await getCabinByIdService(req.params.id);
    if (!existingCabin) {
      return res.status(404).json({ message: "Cabaña no encontrada" });
    }

    // 2. Preparar datos actualizados (ya no manejamos imágenes aquí)
    const cabinData = {
      name: req.body.name || existingCabin.name,
      description: req.body.description || existingCabin.description,
      capacity: req.body.capacity || existingCabin.capacity,
      status: req.body.status || existingCabin.status
    };

    console.log("Datos a actualizar:", cabinData); // Para depuración

    // 3. Actualizar
    const updatedCabin = await updateCabinService(req.params.id, cabinData);
    res.status(200).json(updatedCabin);
  } catch (error) {
    console.error("Error en updateCabinController:", error);
    res.status(400).json({ message: error.message });
  }
};

export const deleteCabinController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const idCabin = req.params.id;

    const comforts = await getGroupedComfortsByCabinService(idCabin);

    if (comforts.length > 0) {
      return res.status(400).json({
        message:
          "No se puede eliminar la cabaña porque tiene comodidades asignadas",
      });
    }

    await deleteCabinService(idCabin);
    res.status(200).json({ message: "Cabaña eliminada correctamente" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};