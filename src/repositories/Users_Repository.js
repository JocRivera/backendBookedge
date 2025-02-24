import { Users } from "../models/index.js";

export const getAllUsers = async () => {
  try {
    return await Users.findAll();
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    throw error;
  }
};

export const getUserById = async (id) => {
  try {
    return await Users.findByPk(id);
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    throw error;
  }
};

export const createUser = async (dataUsers) => {
  try {
    return await Users.create(dataUsers);
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    throw error;
  }
};

export const updateUser = async (id, dataUsers) => {
  try {
    return await Users.update(dataUsers, { where: { id: id } });
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    return await Users.destroy({ where: { id: id } });
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    throw error;
  }
};
