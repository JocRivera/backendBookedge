import express from "express";
import {
  getAllComfortsController,
  getAllComfortById,
  createComfortController,
  updateComfortController,
  deleteComfortController,
} from "../controllers/comfort_Controller.js";

const router = express.Router();
router.get("/", getAllComfortsController);
router.get("/:id", getAllComfortById);
router.post("/", createComfortController);
router.put("/:id", updateComfortController);
router.delete("/:id", deleteComfortController);
export default router;
