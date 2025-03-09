import express from "express";
import {
  getAllBedrooms,
  getBedroomById,
  getBedroomWithComforts,
  createBedroom,
  updateBedroom,
  deleteBedroom,
  changeStatusBedroom,
  addComfortToBedroom,
  updateBedroomComfort,
  removeComfortFromBedroom,
} from "../controllers/Bedrom_Controller.js";
import upload from "../middlewares/Multer.js";
import {
  createBedroomValidation,
  updateBedroomValidation,
  deleteBedroomValidation,
  getBedroomValidation,
  changeStateBedroomValidation,
  addComfortValidation,
  updateComfortValidation,
  deleteComfortValidation,
} from "../middlewares/Validate_Bedrom.js";

const router = express.Router();

// 🏠 Rutas para habitaciones
router.get("/", getAllBedrooms);
router.get("/:id", getBedroomValidation, getBedroomById);
router.post("/", upload.single("imagen"), createBedroomValidation, createBedroom);
router.put("/:id", upload.single("imagen"), updateBedroomValidation, updateBedroom);
router.delete("/:id", deleteBedroomValidation, deleteBedroom);
router.patch("/:id/status", changeStateBedroomValidation, changeStatusBedroom);

// 🏡 Rutas para comodidades de habitaciones
router.get("/:id/comforts", getBedroomWithComforts,getBedroomValidation);
router.post("/:id/comforts", addComfortValidation, addComfortToBedroom);
router.put("/:id/comforts/:idRoomComfort", updateComfortValidation, updateBedroomComfort);
router.delete("/:id/comforts/:idRoomComfort", deleteComfortValidation, removeComfortFromBedroom);

export default router;
