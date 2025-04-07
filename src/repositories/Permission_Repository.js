import { Permissions } from "../models/Permissions_Model.js";
import { Privileges } from "../models/Privileges_Model.js";

export class PermissionRepository {
    async findAll() {
        return await Permissions.findAll({
            include: {
                model: Privileges,
                as: "privileges",
            },
        });
    }

    async findById(id) {
        return await Permissions.findByPk(id, {
            include: {
                model: Privileges,
                as: "privileges",
            },
        });
    }

    async create(permission) {
        return await Permissions.create(permission);
    }

    async update(permission) {
        return await Permissions.update(permission, {
            where: {
                idPermission: permission.idPermission
            }
        });
    }

    async delete(id) {
        return await Permissions.destroy({
            where: {
                idPermission: id
            }
        });
    }

    async addPrivilege(idPrivilege, idPermission) {
        const permission = await Permissions.findByPk(idPermission);
        const privilegeToAdd = await Privileges.findByPk(idPrivilege);
        await permission.addPrivilege(privilegeToAdd);
        return permission;
    }
    async removePrivilege(idPrivilege, idPermission) {
        const permission = await Permissions.findByPk(idPermission);
        const privilegeToRemove = await Privileges.findByPk(idPrivilege);
        await permission.removePrivilege(privilegeToRemove);
    }
    async updatePrivilege(privilege, idPrivilege, idPermission) {
        const permission = await Permissions.findByPk(idPermission);
        const privilegeToUpdate = await Privileges.findByPk(idPrivilege);
        await permission.addPrivilege(privilegeToUpdate, {
            through: {
                privilege: privilege.privilege,
                description: privilege.description,
            },
        });
        return permission;
    }

}

