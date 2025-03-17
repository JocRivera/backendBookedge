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
import { authorize } from "../middlewares/RolesPermissionAuth.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getAllCabinsController);
router.get("/:id", getCabinValidation, getCabinByIdController);
router.post("/", upload.single("imagen"),verifyToken,authorize(["create_cabin"]), createCabinValidation, createCabinController);
router.put("/:id", upload.single("imagen"), updateCabinValidation,verifyToken,authorize(["edit_cabin"]), updateCabinController);
router.delete("/:id", deleteCabinValidation, deleteCabinController);


//agregar comodidades
router.get("/cabinComforts/assignment",getComfortsToCabinController)
router.post("/cabinComforts", addComfortValidation, addComfortToCabinController);
router.put("/cabinComforts/:idBedroomComfort", updateComfortValidation, updateComfortToCabinController);
router.delete("/cabinComforts/:idBedroomComfort", deleteComfortValidation, deleteComfortToCabinController);


export default router;