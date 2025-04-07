import { PrivilegesRepository } from "../repositories/Privileges_Repository.js";

export class PrivilegesService {
    constructor() {
        this.privilegesRepository = new PrivilegesRepository();
    }
    async createPrivilege(data) {
        return this.privilegesRepository.create(data);
    }
    async getPrivileges() {
        return this.privilegesRepository.findAll();
    }
    async getPrivilegeById(id) {
        return this.privilegesRepository.findById(id);
    }
    async updatePrivilege(id, data) {
        return this.privilegesRepository.update(data, id);
    }
    async deletePrivilege(id) {
        return this.privilegesRepository.delete(id);
    }
}
