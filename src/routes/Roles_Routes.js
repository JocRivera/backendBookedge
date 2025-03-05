import express from "express";
import { RolesController } from "../controllers/Roles_Controllers.js";

const router = express.Router();
const rolesController = new RolesController();

router.get("/", rolesController.findAll.bind(rolesController));
router.get("/:id", rolesController.findById.bind(rolesController));
router.post("/", rolesController.create.bind(rolesController));
router.post("/permission", rolesController.addPermission.bind(rolesController));
router.put("/:id", rolesController.update.bind(rolesController));
router.delete("/:id", rolesController.delete.bind(rolesController));

export default router;