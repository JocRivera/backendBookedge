import express from "express";
import {
  getAllComfortsController,
  getAllComfortById,
  createComfortController,
  updateComfortController,
  deleteComfortController,
  
} from "../controllers/comfort_Controller.js";
import { createComfortsValidation,updateComfortValidaiton,getComfortById,deleteComfortValidation } from "../middlewares/Validate_Comforts.js";

const router = express.Router();
router.get("/", getAllComfortsController);
router.get("/:id",getComfortById, getAllComfortById);
router.post("/",createComfortsValidation, createComfortController);
router.put("/:id", updateComfortValidaiton,updateComfortController);
router.delete("/:id",deleteComfortValidation, deleteComfortController);
export default router;
