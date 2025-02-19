import express from "express";
import {
  getAllCabinsController,
  getCabinByIdController,
  createCabinController,
  updateCabinController,
  deleteCabinController,
} from "../controllers/cabinsControllers.js";
import upload from "../middlewares/multer.js"; 

const router = express.Router();

router.get("/", getAllCabinsController); 
router.get("/:id", getCabinByIdController); 
router.post("/", upload.single("IMAGE"), createCabinController); 
router.put("/:id", upload.single("IMAGE"), updateCabinController); 
router.delete("/:id", deleteCabinController); 

export default router;