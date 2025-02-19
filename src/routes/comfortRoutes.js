import express from "express";
import {
  getAllComfortsController,
  getAllComfortById,
  createComfortController,
  updateComfortController,
  deleteComfortController,
} from "../controllers/comfort_Controller.js";
import { validate_Comforts, validateId } from "../middlewares/comfort.js";


const router = express.Router();
router.get("/", getAllComfortsController);
router.get("/:id", validateId, getAllComfortById);  
router.post("/", validate_Comforts, createComfortController);
router.put("/:id", validateId, validate_Comforts, updateComfortController);
router.delete("/:id", validateId, deleteComfortController);
export default router;


