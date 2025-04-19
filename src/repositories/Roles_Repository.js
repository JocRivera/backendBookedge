import { Roles } from "../models/Roles_Model.js";
import { Permissions } from "../models/Permissions_Model.js";
import { Privileges } from "../models/Privileges_Model.js";
import { PermissionRoles } from "../models/Permission_Roles.js";
import { Users } from "../models/user_Model.js";
export class RolesRepository {
  async findAll() {
    return await Roles.findAll({
      include: [
        {
          model: PermissionRoles,
          as: "permissionRoles",
          include: [
            {
              model: Permissions,
              as: "permissions",
              attributes: ["idPermission", "name"],
            },
            {
              model: Privileges,
              as: "privileges",
              attributes: ["idPrivilege", "name"],
            },
          ],
        },
      ],
    });
  }

  async findById(id) {
    return await Roles.findByPk(id, {
      include: [
        {
          model: PermissionRoles,
          as: "permissionRoles",
          include: [
            {
              model: Permissions,
              as: "permissions",
              attributes: ["idPermission", "name"],
            },
            {
              model: Privileges,
              as: "privileges",
              attributes: ["idPrivilege", "name"],
            },
          ],
        },
      ],
    });
  }

  async create(role) {
    return await Roles.create(role);
  }

  async addPermission(idPermission, idRol, idPrivilege) {
    const role = await Roles.findByPk(idRol);
    const permissionToAdd = await Permissions.findByPk(idPermission);
    const privilegeToAdd = await Privileges.findByPk(idPrivilege);

    await role.addPermission(permissionToAdd, {
      through: {
        idPrivilege: privilegeToAdd.idPrivilege,
      },
    });
    return role;
  }

  async removePermission(idPermission, idRol) {
    const role = await Roles.findByPk(idRol);
    const permissionToRemove = await Permissions.findByPk(idPermission);
    await role.removePermission(permissionToRemove);
  }

  async updatePermission(permission, idPermission, idRol) {
    const role = await Roles.findByPk(idRol);
    const permissionToUpdate = await Permissions.findByPk(idPermission);
    await role.addPermission(permissionToUpdate, {
      through: {
        permission: permission.permission,
        description: permission.description,
      },
    });
    return role;
  }

  async update(role, id) {
    return await Roles.update(role, {
      where: {
        idRol: id,
      },
    });
  }

  async delete(id) {
    return await Roles.destroy({
      where: {
        idRol: id,
      },
    });
  }
  async changeStatus(id, status) {
    await Roles.update(
      { status },
      {
        where: {
          idRol: id,
        },
      }
    )
    if (status === false) {
      await Users.update(
        { status },
        {
          where: {
            idRol: id,
          },
        }
      );
    }
  }
}
