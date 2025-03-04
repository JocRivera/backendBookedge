import { RolesRepository } from '../repositories/Roles_Repository.js';

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

    async create(role) {
        return await this.rolesRepository.create(role);
    }

    async addPermission(permission, idPermission, idRole) {
        return await this.rolesRepository.addPermission(permission, idPermission, idRole);
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