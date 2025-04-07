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
        const { name, status, permissions } = data;
        const role = await this.rolesRepository.create({ name, status });
        if (permissions && permissions.length > 0) {
            const existingPermissions = await Permissions.findAll({
                where: {
                    idPermission: permissions
                }
            });
            if (existingPermissions.length > 0) {
                await role.addPermissions(existingPermissions);
            }
            await Promise.all(permissions.map(idPermission =>
                this.rolesRepository.addPermission(idPermission, role.idRol)
            )
            );
        }
        return this.rolesRepository.findById(role.idRol);
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
}