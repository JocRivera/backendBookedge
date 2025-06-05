import express from "express";
import upload from "../middlewares/multerForPlans.js";
import { PlansControllers } from "../controllers/Plans_Controllers.js";
import {
  getUniqueCapacitiesCabin,
  getUniqueCapacitiesBedroom,
  getServicesPerPlan,
} from "../repositories/Plans_Repository.js";

import {
  createPlanValidation,
  getPlanByIdValidation,
  updatePlanValidation,
  deletePlanValidation,
} from "../middlewares/Validate_Plan.js";

const router = express.Router();
const planController = new PlansControllers();

router.get("/servicesPerPlan", async (req, res) => {
  try {
    const services = await getServicesPerPlan();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get("/uniqueCapacitiesBedroom", async (req, res) => {
  try {
    const uniqueCapacities = await getUniqueCapacitiesBedroom();
    res.status(200).json(uniqueCapacities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get("/uniqueCapacitiesCabin", async (req, res) => {
  try {
    const uniqueCapacities = await getUniqueCapacitiesCabin();
    res.status(200).json(uniqueCapacities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get("/", planController.getAllPlans.bind(planController));
router.get(
  "/:id",
  getPlanByIdValidation,
  planController.getPlanById.bind(planController)
);
router.post(
  "/",
  createPlanValidation,
  upload.single("image"),
  planController.createPlan.bind(planController)
);
router.put(
  "/:id",
  updatePlanValidation,
  upload.single("image"),
  planController.updatePlan.bind(planController)
);
router.delete(
  "/:id",
  deletePlanValidation,
  planController.deletePlan.bind(planController)
);

export default router;
