import { PermissionRepository } from "../repositories/Permission_Repository.js";

export class PermissionService {
    constructor() {
        this.PermissionRepository = new PermissionRepository();
    }

    async createPermission(data) {
        const existingPermission = await this.PermissionRepository.findById(data.idPermission);
        if (existingPermission) {
            throw new Error('Permission already exists');
        }
        return this.PermissionRepository.create(data);
    }

    async getPermissions() {
        return this.PermissionRepository.findAll();
    }
    async getPermissionById(id) {
        return this.PermissionRepository.findById(id);
    }
    async updatePermission(id, data) {
        return this.PermissionRepository.update(id, data);
    }
    async deletePermission(id) {
        return this.PermissionRepository.delete(id);
    }

}



