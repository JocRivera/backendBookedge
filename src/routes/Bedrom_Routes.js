import express from "express";
import {
  getAllBedroomsController,
  getBedroomByIdController,
  createBedroomController,
  updateBedroomController,
  deleteBedroomController,
} from "../controllers/Bedrom_Controller.js";
import upload from "../middlewares/Multer.js";
import {
  createBedroomValidation,
  updateBedroomValidation,
  deleteBedroomValidation,
  getBedroomValidation,
} from "../middlewares/Validate_Bedrom.js";

const router = express.Router();

// Rutas para habitaciones
router.get("/", getAllBedroomsController);
router.get("/:id", getBedroomValidation, getBedroomByIdController);
router.post("/", upload.single("imagen"), createBedroomValidation, createBedroomController);
router.put("/:id", upload.single("imagen"), updateBedroomValidation, updateBedroomController);
router.delete("/:id", deleteBedroomValidation, deleteBedroomController);


export default router;
