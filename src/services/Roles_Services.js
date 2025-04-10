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
        const { name, status, permissions, permissionPrivileges } = data;

        // 1. Crear el rol básico
        // 1. Crear el rol básico
        const role = await this.rolesRepository.create({ name, status });

        // 2. Si hay permisos, asociarlos al rol
        if (permissions && permissions.length > 0) {
            const existingPermissions = await Permissions.findAll({
                where: {
                    idPermission: permissions
                }
            });

            if (existingPermissions.length > 0) {
                for (const permission of existingPermissions) {
                    const permId = permission.idPermission;

                    if (permissionPrivileges && permissionPrivileges[permId]) {
                        const privObj = permissionPrivileges[permId];

                        // Agregar cada privilegio activo manualmente a PermissionRoles
                        for (const [privName, isActive] of Object.entries(privObj)) {
                            if (isActive) {
                                const privilege = await Privileges.findOne({
                                    where: { name: privName }
                                });

                                if (privilege) {
                                    await PermissionRoles.create({
                                        idRol: role.idRol,
                                        idPermission: permission.idPermission,
                                        idPrivilege: privilege.idPrivilege
                                    });
                                }
                            }
                        }
                    } else {
                        // Si no hay privilegios definidos, igual se puede guardar la relación sin privilegio
                        await PermissionRoles.create({
                            idRol: role.idRol,
                            idPermission: permission.idPermission,
                            idPrivilege: null
                        });
                    }
                }
            }
        }

        // 4. Devolver el rol completo con sus asociaciones
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