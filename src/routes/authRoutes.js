import express from "express";
import { getMe,loginController, registerController,logoutController, refreshTokenController,resetPasswordController,recoveryPasswordController   } from "../controllers/Auth_Controller.js"
import { verifyToken } from "../middlewares/authMiddleware.js";
import { registerValidation } from "../middlewares/Validate_Auth.js";
const router = express.Router();

router.post("/login", loginController);
router.post("/register",registerValidation, registerController);
router.post("/logout",verifyToken,logoutController)
router.post("/refresh", refreshTokenController); 
router.post("/recover-password",recoveryPasswordController);
router.post("/reset-password",resetPasswordController)
router.get("/me",verifyToken,getMe)



export default router;
