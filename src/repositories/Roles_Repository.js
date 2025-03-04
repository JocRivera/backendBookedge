import { Roles } from '../models/Roles_Model.js';
import { Permissions } from '../models/Permissions_Model.js';
import { PermissionRoles } from '../models/Permission_Roles.js';

export class RolesRepository {
    async findAll() {
        return await Roles.findAll({
            include: {
                model: Permissions,
                as: 'permissions',
                // through: {
                //     model: RolesPermissions,
                //     as: 'roles_permissions',
                //     attributes: []
                // }
            }
        });
    }

    async findById(id) {
        return await Roles.findByPk(id, {
            include: {
                model: Permissions,
                as: 'permissions',
            }
        });
    }

    async create(role) {
        return await Roles.create(role);
    }

    async addPermission(permission, idPermission, idRol) {
        const role = await Roles.findByPk(idRol);
        const permissionToAdd = await Permissions.findByPk(idPermission);
        await role.addPermission(permissionToAdd, {
            through: {
                permission: permission.permission,
            }
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
                description: permission.description
            }
        });
        return role;
    }

    async update(role, id) {
        return await Roles.update(role, {
            where: {
                id: id
            }
        });
    }

    async delete(id) {
        return await Roles.destroy({
            where: {
                id: id
            }
        });
    }
}
