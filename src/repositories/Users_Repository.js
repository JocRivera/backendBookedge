import { Users } from "../models/user_Model.js";
import { Roles } from "../models/Roles_Model.js";
import { Permissions } from "../models/Permissions_Model.js";
import { PermissionRoles } from "../models/Permission_Roles.js";
import { Privileges } from "../models/Privileges_Model.js";

export const getAllUsers = async () => {
  return await Users.findAll({
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
    ], attributes: { exclude: ["password", "refreshToken"] }
  });
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
            model: PermissionRoles,
            as: "permissionRoles",
            include: [
              {
                model: Permissions,
                as: "permissions",
                attributes: ["name"]
              },
              {
                model: Privileges,
                as: "privileges",
                attributes: ["name"]
              }
            ]
          }
        ]
      }
    ]
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
