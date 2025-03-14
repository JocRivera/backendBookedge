import { Users } from "../models/user_Model.js";
import { Roles } from "../models/Roles_Model.js";
import { Permissions } from "../models/Permissions_Model.js";

export const getAllUsers = async () => {
  return await Users.findAll(); 
};

export const getUserById = async (id) => {
  return await Users.findByPk(id, {
    include: [
      {
        model: Roles,
        as: "role",
        attributes: ["name"],
        include: [
          {
            model: Permissions,
            as: "permissions",
            attributes: ["name"], 
            through: { attributes: [] }, 
          },
        ],
      },
    ],
  });
};


export const createUser = async (dataUsers) => {
  return await Users.create(dataUsers);
};

export const updateUser = async (id, dataUsers) => {
  return await Users.update(dataUsers, { where: { idUser: id } });
};

export const changeStatusUser = async (id, status) => {
  return await Users.update({ status }, { where: { idUser: id } });
};

export const deleteUser = async (id) => {
  return await Users.destroy({ where: { idUser: id } });
};
