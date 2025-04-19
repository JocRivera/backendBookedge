import { Router } from "express";
import {
  assignComfortsToBedroomController,
  getBedroomsWithoutComfortsController,
  getAllComfortsForBedroomsController,
  getGroupedComfortsByBedroomController,
  updateGroupedComfortsByBedroomController
} from "../controllers/BedroomComforts_Controller.js";
import { validateAssignOrUpdateComfortsToBedroom } from "../middlewares/validateAssignOrUpdateComforts .js";

const router = Router();

router.post("/assign", validateAssignOrUpdateComfortsToBedroom, assignComfortsToBedroomController);
router.put("/update", validateAssignOrUpdateComfortsToBedroom, updateGroupedComfortsByBedroomController);
router.get("/bedrooms-without-comforts", getBedroomsWithoutComfortsController);
router.get("/all", getAllComfortsForBedroomsController);
router.get("/grouped/:id", getGroupedComfortsByBedroomController);

export default router;