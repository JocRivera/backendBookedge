import bcrypt from "bcryptjs";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  changeStatusUser,
} from "../repositories/Users_Repository.js";

const SALT_ROUNDS = 10;

export const getAllUsersService = async () => await getAllUsers();

export const getUserByIdService = async (id) => await getUserById(id);

export const createUserService = async (dataUsers) => {
  const hashedPassword = await bcrypt.hash(dataUsers.password, SALT_ROUNDS);
  dataUsers.password = hashedPassword;
  return await createUser(dataUsers);
};

export const updateUserService = async (id, dataUsers) => {
  dataUsers.password = await bcrypt.hash(dataUsers.password, SALT_ROUNDS);
  return await updateUser(id, dataUsers);
};

export const changeStatusUserService = async (id,State) => {
  return await changeStatusUser(id,State)
}
export const deleteUserService = async (id) => await deleteUser(id);
