import express from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  changeStatusUser,
} from "../controllers/User_Controller.js";
import { getUserByIdValidation,createUserValidation,updateUserValidation,deleteUserValidation,changeStatusUserValidation} from "../middlewares/Validate_User.js";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id",getUserByIdValidation, getUserById);
router.post("/", createUserValidation,createUser);
router.put("/:id", updateUserValidation,updateUser);
router.delete("/:id",deleteUserValidation, deleteUser);
router.patch("/:id",changeStatusUserValidation,changeStatusUser)

export default router;
