import express from "express";

import { PlanProgramedController } from "../controllers/Plan_Programed_Controller.js";
import { createProgramedPlanValidation, updateProgramedPlanValidation, getProgramedPlanValidation } from "../middlewares/Validate_ProgramedPlan.js";

const router = express.Router();
const planProgramedController = new PlanProgramedController();

router.get("/", planProgramedController.getAllProgramedPlans.bind(planProgramedController));
router.get("/:id", getProgramedPlanValidation, planProgramedController.getPlanProgramedById.bind(planProgramedController));
router.post("/", createProgramedPlanValidation, planProgramedController.createPlanProgramed.bind(planProgramedController));
router.put("/:id", updateProgramedPlanValidation, planProgramedController.updatePlanProgramed.bind(planProgramedController));
router.delete("/:id", planProgramedController.deletePlanProgramed.bind(planProgramedController));

export default router;
