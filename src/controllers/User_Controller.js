import {
  getAllUsersService,
  getUserByIdService,
  createUserService,
  updateUserService,
  deleteUserService,
} from "../services/Users_Services.js";
import bcrypt from "bcryptjs";
import { SALT_ROUDS } from "../config.js";

export const getAllUsers = async (req, res) => {
  try {
    return res.json(await getAllUsersService());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    return res.json(await getUserByIdService(req.params.id));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const { Password } = req.body;
    const hash = bcrypt.hashSync(Password, SALT_ROUDS);
    req.body.Password = hash;
    return res.json(await createUserService(req.body));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const UpdateUser = async (req, res) => {
  try {
    const { Password } = res.body;
    const hash = bcrypt.hashSync(Password, SALT_ROUDS);
    req.body.Password = hash;
    return res.json(await updateUserService(req.params.id, req.body));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const DeleteUser = async (req, res) => {
  try {
    return res.json(await deleteUserService(req.params.id));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
