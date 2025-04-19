import express from "express";
import {getRoomImagesController,uploadRoomImagesController,deleteRoomImageController,setPrimaryImageController} from "../controllers/RoomImage_Controller.js"
import upload from "../middlewares/Multer.js";

const router = express.Router();

router.get("/:roomId", getRoomImagesController);
router.post("/:roomId", upload.array("images", 5), uploadRoomImagesController); // Permitir hasta 5 imágenes
router.delete("/:imageId", deleteRoomImageController);
router.put("/:roomId/primary/:imageId", setPrimaryImageController);

export default router;