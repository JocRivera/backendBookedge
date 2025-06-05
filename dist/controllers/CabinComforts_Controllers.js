import { validationResult } from "express-validator";
import {
  assignComfortsToCabinService,
  updateGroupedComfortsByCabinService,
} from "../services/CabinComfort_Service.js";


export const assignComfortsToCabinController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { idCabin } = req.params; 
    const { comforts } = req.body; 

    if (!comforts || !Array.isArray(comforts)) {
        return res.status(400).json({ message: "El campo 'comforts' es requerido y debe ser un array de IDs." });
    }
    // Asegúrate que idCabin sea un número si es necesario
    await assignComfortsToCabinService({ idCabin: parseInt(idCabin), comforts });
    res.status(200).json({ message: "Comodidades asignadas/añadidas correctamente a la cabaña." });
  } catch (error) {
    console.error("Error en assignComfortsToCabinController:", error);
    res.status(500).json({ message: "Error al asignar comodidades.", error: error.message });
  }
};

// 📝 Actualizar el conjunto COMPLETO de comodidades asignadas a una cabaña
// Ruta: PUT /api/cabins/:idCabin/comforts (ejemplo de ruta)
export const updateCabinComfortsController = async (req, res) => { // Renombrado para claridad
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { idCabin } = req.params;
    const { comforts } = req.body;

    if (comforts === undefined || !Array.isArray(comforts)) { 
        return res.status(400).json({ message: "El campo 'comforts' debe ser un array de IDs si se proporciona." });
    }
    await updateGroupedComfortsByCabinService({ idCabin: parseInt(idCabin), comforts });
    res.status(200).json({ message: "Conjunto de comodidades de la cabaña actualizado correctamente." });
  } catch (error) {
    console.error("Error en updateCabinComfortsController:", error);
    res.status(500).json({ message: "Error al actualizar comodidades.", error: error.message });
  }
};