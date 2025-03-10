import express from "express";
import { login, registerCustomer } from "../controllers/Auth_Controller.js"
const router = express.Router();

router.post("/login", login);
router.post("/register", registerCustomer);

export default router;
