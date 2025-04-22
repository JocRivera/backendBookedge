import express from "express";
import { getUserProfileController,updateProfileController,loginController,logoutController, refreshTokenController,resetPasswordController,recoveryPasswordController,registerController   } from "../controllers/Auth_Controller.js"
import { verifyToken } from "../middlewares/authMiddleware.js";
import { registerValidation } from "../middlewares/Validate_Auth.js";
import {updateUserValidation} from "../middlewares/Validate_User.js";

const router = express.Router();

router.post("/login", loginController);
router.post("/register",registerValidation, registerController);
router.post("/logout",verifyToken,logoutController)
router.post("/refresh", refreshTokenController); 
router.post("/recover-password",recoveryPasswordController);
router.post("/reset-password",resetPasswordController)
router.get("/me", verifyToken, getUserProfileController);
router.put("/update/:id",verifyToken,updateProfileController,updateUserValidation)



export default router;
