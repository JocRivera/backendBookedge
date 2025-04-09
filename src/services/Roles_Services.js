import { RolesRepository } from '../repositories/Roles_Repository.js';
import { Permissions } from '../models/Permissions_Model.js';
import { Privileges } from '../models/Privileges_Model.js';
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
        const role = await this.rolesRepository.create({ name, status });

        // 2. Si hay permisos, asociarlos al rol
        if (permissions && permissions.length > 0) {
            const existingPermissions = await Permissions.findAll({
                where: {
                    idPermission: permissions
                }
            });

            if (existingPermissions.length > 0) {
                await role.addPermissions(existingPermissions);

                // 3. Procesar privilegios para cada permiso
                if (permissionPrivileges) {
                    // Para cada permiso, configurar sus privilegios
                    for (const permission of existingPermissions) {
                        const permId = permission.idPermission;

                        // Si hay privilegios definidos para este permiso
                        if (permissionPrivileges[permId]) {
                            const privObj = permissionPrivileges[permId];

                            // Para cada tipo de privilegio (post, read, put, delete)
                            for (const [privName, isActive] of Object.entries(privObj)) {
                                if (isActive) {
                                    // Buscar el privilegio por nombre
                                    const privilege = await Privileges.findOne({
                                        where: { name: privName }
                                    });

                                    if (privilege) {
                                        // Asociar el privilegio al permiso (usando el método de la asociación)
                                        await permission.addPrivilege(privilege);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        // 4. Devolver el rol completo con sus asociaciones
        return await this.rolesRepository.findById(role.idRol);
    }

    async addPermission(idPermission, idRole) {
        return await this.rolesRepository.addPermission(idPermission, idRole);
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