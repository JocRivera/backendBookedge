// CabinImage_Routes.js
import express from "express";
import {
  getCabinImagesController,
  uploadCabinImagesController,
  deleteCabinImageController,
  setPrimaryImageController
} from "../controllers/CabinImage_Controller.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.get("/:cabinId", getCabinImagesController);
router.post("/:cabinId", upload.array("images", 5), uploadCabinImagesController); // Permitir hasta 5 imágenes
router.delete("/:imageId", deleteCabinImageController);
router.put("/:cabinId/primary/:imageId", setPrimaryImageController);

export default router;