import { Users } from "../models/User_Model.js";

export const getAllUsers = async () => {
  return await Users.findAll();
};

export const getUserById = async (id) => {
  return await Users.findByPk(id);
};

export const createUser = async (dataUsers) => {
  return await Users.create(dataUsers);
};

export const updateUser = async (id, dataUsers) => {
  return await Users.update(dataUsers, { where: { idUser: id } });
};

export const changeStatusUser = async (id, State) => {
  return await Users.update({ State }, { where: { idUser: id } });
};

export const deleteUser = async (id) => {
  return await Users.destroy({ where: { idUser: id } });
};
