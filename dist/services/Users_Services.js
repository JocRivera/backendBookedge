import bcrypt from "bcryptjs";
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
} from "../repositories/Users_Repository.js";

const SALT_ROUNDS = 10;

export const getAllUsersService = async () => await getAllUsers();

export const getJustUsersService = async () => await getJustUsers();

export const getAllCustomersService = async () => await getAllCustomers();

export const getUserByIdService = async (id) => await getUserById(id);

export const getJustUserByIdService = async (id) => await getJustUserById(id);

export const getCustomerByIdService = async (id) => await getCustomerById(id);

export const createUserService = async (dataUsers) => {
  const hashedPassword = await bcrypt.hash(dataUsers.password, SALT_ROUNDS);
  dataUsers.password = hashedPassword;
  return await createUser(dataUsers);
};

export const updateUserService = async (id, dataUsers) => {
  if (dataUsers.password) {
    dataUsers.password = await bcrypt.hash(dataUsers.password, SALT_ROUNDS);
  }
  return updateUser(id, dataUsers);
};

export const changeStatusUserService = async (id, status) => {
  return await changeStatusUser(id, status);
};
export const deleteUserService = async (id) => await deleteUser(id);

