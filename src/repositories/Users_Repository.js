import { Users } from "../models/index.js";

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
  return await Users.update(dataUsers, { where: { id: id } });
};

export const deleteUser = async (id) => {
  return await Users.destroy({ where: { id: id } });
};
