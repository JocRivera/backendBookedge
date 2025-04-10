import { Router } from "express";
import {
  assignComfortsToCabinController,
  getCabinsWithoutComfortsController,
  getAllComfortsForCabinsController,
  getGroupedComfortsByCabinController,
  updateGroupedComfortsByCabinController
} from "../controllers/CabinComforts_Controllers.js";

import { validateAssignOrUpdateComforts } from "../middlewares/validateAssignOrUpdateComforts .js";
const router = Router();

router.post("/assign", validateAssignOrUpdateComforts, assignComfortsToCabinController);

router.put("/update", validateAssignOrUpdateComforts, updateGroupedComfortsByCabinController);

router.get("/cabins-without-comforts", getCabinsWithoutComfortsController);

router.get("/all", getAllComfortsForCabinsController);

router.get("/grouped/:id", getGroupedComfortsByCabinController);

export default router;
