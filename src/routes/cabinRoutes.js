import express from "express";
import {
  getAllCabins,
  getCabinById,
  createCabin,
  updateCabin,
  deleteCabin,
  addComforts,
  deleteComforts,
} from "../controllers/cabinsControllers.js";

const router = express.Router();
router.get("/", getAllCabins);
router.get("/:id", getCabinById);
router.post("/", createCabin);
router.put("/:id", updateCabin);
router.delete("/:id", deleteCabin);
router.post("/:id/comforts/:comfortId", addComforts);
router.delete("/:id/comforts/:comfortId", deleteComforts);
export default router;
