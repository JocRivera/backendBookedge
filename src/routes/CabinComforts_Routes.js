import { Router } from "express";
import {
  assignComfortsToCabinController,
  updateCabinComfortsController
} from "../controllers/CabinComforts_Controllers.js";

import { validateAssignOrUpdateComforts } from "../middlewares/validateAssignOrUpdateComforts .js";
const router = Router();

router.post("/:idCabin/comforts", validateAssignOrUpdateComforts, assignComfortsToCabinController);

router.put("/:idCabin/comforts", validateAssignOrUpdateComforts, updateCabinComfortsController);

export default router;
