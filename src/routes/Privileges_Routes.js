import express from "express";
import { PrivilegesController } from "../controllers/Privileges_Controller.js";
const router = express.Router();
const privilegeController = new PrivilegesController();

router.get("/", privilegeController.getPrivileges.bind(privilegeController));
router.get("/:id", privilegeController.getPrivilegeById.bind(privilegeController));
router.post("/", privilegeController.createPrivilege.bind(privilegeController));
router.put("/:id", privilegeController.updatePrivilege.bind(privilegeController));
router.delete("/:id", privilegeController.deletePrivilege.bind(privilegeController));

export default router;