import {
  getAllUsersService,
  getUserByIdService,
  createUserService,
  updateUserService,
  deleteUserService,
  changeStatusUserService,
} from "../services/Users_Services.js";
import { validationResult } from "express-validator";

export const getAllUsers = async (req, res) => {
  try {
    return res.json(await getAllUsersService());
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getUserById = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }
  try {
    return res.json(await getUserByIdService(req.params.id));
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty) {
    res.status(400).json({ errors: errors.array() });
  }
  try {
    const newUser = await createUserService(req.body);
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }
  try {
    const updatedUser = await updateUserService(req.params.id, req.body);
    return res.json(updatedUser);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty) {
    res.status(400).json({ errors: errors.array() });
  }
  try {
    await deleteUserService(req.params.id);
    return res.json({ message: "Usuario eliminado" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const changeStatusUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    await changeStatusUserService(req.params.id, req.body);
    res.status(200).end();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
