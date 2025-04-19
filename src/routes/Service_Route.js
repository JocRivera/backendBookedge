import express from "express";

import { ServicesController } from "../controllers/Services_Controllers.js";
import { validateService, updateServiceValidation } from "../middlewares/Validate_Service.js";
const router = express.Router();
const servicesController = new ServicesController();

router.get("/", servicesController.getAllServices.bind(servicesController));
router.get("/:id", servicesController.getServiceById.bind(servicesController));
router.post("/", validateService, servicesController.createService.bind(servicesController));
router.put("/:id", servicesController.updateService.bind(servicesController));
router.delete("/:id", servicesController.deleteService.bind(servicesController));
router.patch("/:id", servicesController.changeStatus.bind(servicesController));
export default router;
