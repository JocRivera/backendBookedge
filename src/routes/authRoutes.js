import express from "express";
import { loginController, registerController,logoutController,editProfileController,getProfileController} from "../controllers/Auth_Controller.js"
const router = express.Router();
import { verifyToken } from "../middlewares/authMiddleware.js";

router.post("/login", loginController);
router.post("/register", registerController);
router.post("/logout",verifyToken,logoutController)
router.get("/profile",verifyToken,getProfileController)
router.put("/edit-profile",verifyToken,editProfileController)


export default router;
