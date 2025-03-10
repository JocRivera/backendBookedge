import express from "express";

import { PlansControllers } from "../controllers/Plans_Controllers.js";
import { createPlanValidation, getPlanByIdValidation, updatePlanValidation, deletePlanValidation } from "../middlewares/Validate_Plan.js";

const router = express.Router();
const planController = new PlansControllers();

router.get("/", planController.getAllPlans.bind(planController));
router.get("/:id", getPlanByIdValidation, planController.getPlanById.bind(planController));
router.post("/", createPlanValidation, planController.createPlan.bind(planController));
router.put("/:id", updatePlanValidation, planController.updatePlan.bind(planController));
router.delete("/:id", deletePlanValidation, planController.deletePlan.bind(planController));

export default router;
