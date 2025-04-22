import express from "express";
import { RolesController } from "../controllers/Roles_Controllers.js";
import { createRolValidation, getRolByIdValidation, updateRolValidation, deleteRolValidation } from "../middlewares/Validate_Rol.js";
const router = express.Router();
const rolesController = new RolesController();

router.get("/", rolesController.findAll.bind(rolesController));
router.get("/:id", rolesController.findById.bind(rolesController));
router.post("/", createRolValidation, rolesController.create.bind(rolesController));
router.post("/permission", rolesController.addPermission.bind(rolesController));
router.put("/:id", updateRolValidation, rolesController.update.bind(rolesController));
router.delete("/:id", deleteRolValidation, rolesController.delete.bind(rolesController));
router.patch("/:id", rolesController.changeStatus.bind(rolesController));

export default router;