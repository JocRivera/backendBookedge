import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../repositories/Users_Repository.js";

export const getAllUsersService = async () => {
  return await getAllUsers();
};

export const getUserByIdService = async (id) => {
  return await getUserById(id);
};

export const createUserService = async (dataUsers) => {
  return await createUser(dataUsers);
}

export const updateUserService = async (id,dataUsers)=>{
    return await updateUser(id,dataUsers);
}

export const deleteUserService = async (id) => {
    return await deleteUser(id);
}