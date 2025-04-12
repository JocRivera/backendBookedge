import express from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  changeStatusUser,
} from "../controllers/User_Controller.js";
import {
  getUserByIdValidation,
  createUserValidation,
  updateUserValidation,
  deleteUserValidation,
  changeStatusUserValidation,
} from "../middlewares/Validate_User.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { authorize } from "../middlewares/RolesPermissionAuth.js";

const router = express.Router();

// Rutas protegidas por permisos + privilegios
router.get("/", verifyToken, authorize("Usuarios", "read"), getAllUsers);
router.get("/:id", getUserByIdValidation, verifyToken, authorize("Usuarios", "read"), getUserById);
router.post("/", createUserValidation, verifyToken, authorize("Usuarios", "post"), createUser);
router.put("/:id", updateUserValidation, verifyToken, authorize("Usuarios", "put"), updateUser);
router.delete("/:id", deleteUserValidation, verifyToken, authorize("Usuarios", "delete"), deleteUser);
router.patch("/:id",changeStatusUserValidation,verifyToken,authorize("Usuarios", "changeStatus"),changeStatusUser);

export default router;
