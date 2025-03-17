import express from "express";
import { loginController, registerController,logoutController, refreshTokenController   } from "../controllers/Auth_Controller.js"
import { verifyToken } from "../middlewares/authMiddleware.js";
import { registerValidation } from "../middlewares/Validate_Auth.js";
const router = express.Router();

router.post("/login", loginController);
router.post("/register",registerValidation, registerController);
router.post("/logout",verifyToken,logoutController)
router.post("/refresh", refreshTokenController); 



export default router;
