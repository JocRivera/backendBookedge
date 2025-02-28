import { PermissionRepository } from "../repositories/Permission_Repository";

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
}



