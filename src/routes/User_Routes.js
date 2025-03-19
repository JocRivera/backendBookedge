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

router.get("/", verifyToken, authorize(["view_users"]), getAllUsers);
router.get("/:id", getUserByIdValidation, verifyToken, authorize(["view_users"]), getUserById);
router.post("/", createUserValidation, verifyToken, authorize(["create_users"]), createUser);
router.put("/:id", updateUserValidation, verifyToken, authorize(["edit_users"]), updateUser);
router.delete("/:id", deleteUserValidation, verifyToken, authorize(["delete_users"]), deleteUser);
router.patch("/:id", changeStatusUserValidation, verifyToken, authorize(["change_status_users"]), changeStatusUser);

export default router;
