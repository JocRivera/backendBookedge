import express from "express";
import { loginController, registerController,logoutController} from "../controllers/Auth_Controller.js"
const router = express.Router();
import { verifyToken } from "../middlewares/authMiddleware.js";

router.post("/login", loginController);
router.post("/register", registerController);
router.post("/logout",verifyToken,logoutController)


export default router;
