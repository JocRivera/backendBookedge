import express from "express";
import {
  getAllCabinsController,
  getCabinByIdController,
  createCabinController,
  updateCabinController,
  deleteCabinController,
} from "../controllers/Cabins_Controllers.js";
import {
  createCabinValidation,
  updateCabinValidation,
  deleteCabinValidation,
  getCabinValidation,
} from "../middlewares/Valide_Cabins.js";
import { authorize } from "../middlewares/RolesPermissionAuth.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getAllCabinsController);
router.get("/:id", getCabinValidation, getCabinByIdController);
router.post("/", createCabinValidation, createCabinController);
router.put("/:id", updateCabinValidation, updateCabinController);
router.delete("/:id",  deleteCabinValidation, deleteCabinController);


export default router;