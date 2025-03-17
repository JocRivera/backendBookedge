import express from "express";
import {
  getAllCabinsController,
  getCabinByIdController,
  createCabinController,
  updateCabinController,
  deleteCabinController,
  getComfortsToCabinController,
  addComfortToCabinController,
  updateComfortToCabinController,
  deleteComfortToCabinController,
} from "../controllers/Cabins_Controllers.js";
import {
  createCabinValidation,
  updateCabinValidation,
  deleteCabinValidation,
  getCabinValidation,
  addComfortValidation,
  updateComfortValidation,
  deleteComfortValidation,
} from "../middlewares/Valide_Cabins.js";
import upload from "../middlewares/Multer.js";

const router = express.Router();

router.get("/", getAllCabinsController);
router.get("/:id", getCabinValidation, getCabinByIdController);
router.post("/", upload.single("imagen"), createCabinValidation, createCabinController);
router.put("/:id", upload.single("imagen"), updateCabinValidation, updateCabinController);
router.delete("/:id", deleteCabinValidation, deleteCabinController);


//agregar comodidades
router.get("/cabinComforts/assignment",getComfortsToCabinController)
router.post("/cabinComforts", addComfortValidation, addComfortToCabinController);
router.put("/cabinComforts/:idBedroomComfort", updateComfortValidation, updateComfortToCabinController);
router.delete("/cabinComforts/:idBedroomComfort", deleteComfortValidation, deleteComfortToCabinController);


export default router;