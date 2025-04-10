import { RolesRepository } from '../repositories/Roles_Repository.js';
import { Permissions } from '../models/Permissions_Model.js';
import { Privileges } from '../models/Privileges_Model.js';
import { PermissionRoles } from '../models/Permission_Roles.js';
export class RolesService {
    constructor() {
        this.rolesRepository = new RolesRepository();
    }

    async findAll() {
        return await this.rolesRepository.findAll();
    }

    async findById(id) {
        return await this.rolesRepository.findById(id);
    }

    async create(data) {
        const { name, status, permissionRoles } = data;
        const role = await this.rolesRepository.create({ name, status });

        if (permissionRoles && permissionRoles.length > 0) {
            for (const { idPermission, idPrivilege } of permissionRoles) {
                const permission = await Permissions.findByPk(idPermission);
                const privilege = await Privileges.findByPk(idPrivilege);

                if (permission && privilege) {
                    await PermissionRoles.create({
                        idRol: role.idRol,
                        idPermission,
                        idPrivilege
                    });
                }
            }
        }

        return await this.rolesRepository.findById(role.idRol);
    }


    async addPermission(idPermission, idRole, idPrivilege) {
        return await this.rolesRepository.addPermission(idPermission, idRole, idPrivilege);
    }

    async removePermission(idPermission, idRole) {
        return await this.rolesRepository.removePermission(idPermission, idRole);
    }

    async updatePermission(permission, idPermission, idRole) {
        return await this.rolesRepository.updatePermission(permission, idPermission, idRole
        );
    }

    async update(role, id) {
        return await this.rolesRepository.update(role, id);
    }

    async delete(id) {
        return await this.rolesRepository.delete(id);
    }

    async changeStatus(id, status) {
        return await this.rolesRepository.changeStatus(id, status);
    }
}