import express from "express";
import {
  getRoomImagesController,
  uploadRoomImagesController,
  deleteRoomImageController,
  setPrimaryImageController
} from "../controllers/RoomImage_Controller.js";
import upload from "../middlewares/Multer.js";
import { validateRoomId, validateImageId } from "../middlewares/validateImageParams.js";

const router = express.Router();

router.get("/:roomId", validateRoomId, getRoomImagesController);
router.post("/:roomId", validateRoomId, upload.array("images", 5), uploadRoomImagesController);
router.delete("/:imageId", validateImageId, deleteRoomImageController);
router.put("/:roomId/primary/:imageId", validateRoomId, validateImageId, setPrimaryImageController);

export default router;
