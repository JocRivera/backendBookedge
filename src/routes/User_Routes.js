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
  updateUserValidation,
  deleteUserValidation,
} from "../middlewares/Validate_User.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { authorize } from "../middlewares/RolesPermissionAuth.js";

const router = express.Router();

router.get("/", verifyToken, authorize(["view_users"]), getAllUsers);
router.get("/:id", getUserByIdValidation, verifyToken, authorize(["view_users"]), getUserById);
router.post("/", verifyToken, authorize(["create_user"]), createUser);
router.put("/:id", updateUserValidation, verifyToken, authorize(["edit_user"]), updateUser);
router.delete("/:id", deleteUserValidation, verifyToken, authorize(["delete_user"]), deleteUser);
router.patch("/:id", verifyToken, authorize(["change_status_user"]), changeStatusUser);

export default router;
