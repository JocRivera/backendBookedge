import { PermissionRepository } from "../repositories/Permission_Repository.js";
import { Privileges } from "../models/Privileges_Model.js";
export class PermissionService {
    constructor() {
        this.PermissionRepository = new PermissionRepository();
    }

    async createPermission(data) {
        const { name, status, privileges } = data;
        const permission = await this.PermissionRepository.create({ name, status });
        if (privileges && privileges.length > 0) {
            const existingPrivileges = await Privileges.findAll({
                where: {
                    idPrivilege: privileges
                }
            });
            if (existingPrivileges.length > 0) {
                await permission.addPrivileges(existingPrivileges);
            }
            await Promise.all(privileges.map(idPrivilege =>
                this.PermissionRepository.addPrivilege(idPrivilege, permission.idPermission)
            )
            );
        }
        return this.PermissionRepository.findById(permission.idPermission);
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
    async addPrivilege(idPrivilege, idPermission) {
        return await this.PermissionRepository.addPrivilege(idPrivilege, idPermission);
    }
    async removePrivilege(idPrivilege, idPermission) {
        return await this.PermissionRepository.removePrivilege(idPrivilege, idPermission);
    }
    async updatePrivilege(privilege, idPrivilege, idPermission) {
        return await this.PermissionRepository.updatePrivilege(privilege, idPrivilege, idPermission);
    }
    async findPrivilegesById(id) {
        return await this.PermissionRepository.findPrivilegesById(id);
    }

}



