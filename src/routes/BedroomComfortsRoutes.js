import { Router } from "express";
import {
  assignComfortsToCabinBedroomController,

  updateBedroomsComfortsController
} from "../controllers/BedroomComforts_Controller.js";
import { validateAssignOrUpdateComforts } from "../middlewares/validateAssignOrUpdateComforts .js";

const router = Router();

router.post("/idRoom/comforts", validateAssignOrUpdateComforts, assignComfortsToCabinBedroomController);
router.put("/idRoom/comforts", validateAssignOrUpdateComforts, updateBedroomsComfortsController);

export default router;