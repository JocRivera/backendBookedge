import express from "express";
import {
  getAllCabins,
  getCabinById,
  createCabin,
  updateCabin,
  deleteCabin,
  addComforts,
  updateComfort,
  changeStatusCabin,
  deleteComfort,
} from "../controllers/Cabins_Controllers.js";
import {
  createCabinValidation,
  updateCabinValidation,
  deleteCabinValidation,
  getCabinValidation,
  changeStateCabinValidation,
  addComfortValidation,
  updateComfortValidation,
  deleteComfortValidation
  
} from "../middlewares/Valide_Cabins.js";
import upload from "../middlewares/Multer.js";

const router = express.Router();

// Rutas para cabañas
router.get("/", getAllCabins);
router.get("/:id", getCabinValidation, getCabinById);
router.post("/", upload.single("imagen"), createCabinValidation, createCabin);
router.put("/:id", upload.single("imagen"), updateCabinValidation, updateCabin);
router.delete("/:id", deleteCabinValidation, deleteCabin);
router.patch("/:id/status", changeStateCabinValidation, changeStatusCabin);

// Rutas para comodidades de cabañas
router.post("/:idCabin/comforts/:idComfort" ,addComfortValidation, addComforts);
router.put("/comforts/:idCabinComfort",updateComfortValidation, updateComfort);
router.delete("/comforts/:idCabinComfort",deleteComfortValidation,  deleteComfort);
export default router;
