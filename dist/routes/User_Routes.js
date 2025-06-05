import express from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  changeStatusUser,
  getAllCustomers,
  getCustomerById,
  getJustUsers,
  getJustUserById
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
router.get("/",verifyToken,authorize("usuarios","read"), getAllUsers);
router.get("/:id",verifyToken,authorize("usuarios","read"),  getUserById);
router.post("/", verifyToken,authorize("usuarios","post"), createUserValidation,  createUser);
router.put("/:id",verifyToken,authorize("usuarios","put"),  updateUserValidation, verifyToken, updateUser);
router.delete("/:id",verifyToken,authorize("usuarios","delete"),   deleteUser);
router.patch("/:id",verifyToken,authorize("usuarios","changeStatus"), changeStatusUser);

router.get("/Users/get",
  // verifyToken,
  // authorize("Usuarios", "read"),
  getJustUsers)

router.get("/Users/get/:id", getUserByIdValidation,
  // verifyToken,
  // authorize("Usuarios", "read"),
  getJustUserById);

//Customer
router.get("/customers/get",
  verifyToken,
  authorize("Clientes", "read"),
  getAllCustomers);
router.get("/customers/getId/:id", getUserByIdValidation,
  // verifyToken,
  // authorize("Clientes", "read"),
  getCustomerById);
router.post("/customers/post", createUserValidation,
  // verifyToken,
  // authorize("Clientes", "post"),
  createUser);
router.put("/customers/put/:id", updateUserValidation,
  // verifyToken,
  // authorize("Clientes", "put"),
  updateUser);
router.delete("/customers/delete/:id", deleteUserValidation,
  // verifyToken,
  // authorize("Clientes", "delete"),
  deleteUser);
router.patch("/customers/patch/:id",changeStatusUserValidation,
  // verifyToken,
  // authorize("Clientes", "changeStatus"),
  changeStatusUser);
  

export default router;
