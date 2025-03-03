import express from "express";
import { PermissionsController } from "../controllers/Permissions_Controller.js";
import { validatePermission } from "../middlewares/Validate_Permission.js";

const router = express.Router();
const permissionController = new PermissionsController();

router.get("/", permissionController.getPermissions.bind(permissionController));
router.get("/:id", permissionController.getPermissionById.bind(permissionController));
router.post("/", validatePermission, permissionController.createPermission.bind(permissionController));
router.put("/:id", validatePermission, permissionController.updatePermission.bind(permissionController));
router.delete("/:id", permissionController.deletePermission.bind(permissionController));

export default router;
