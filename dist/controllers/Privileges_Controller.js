import { PrivilegesService } from '../services/Privileges_Service.js';

export class PrivilegesController {
    constructor() {
        this.PrivilegesService = new PrivilegesService();
    }

    async createPrivilege(req, res) {
        try {
            const data = req.body;
            const privilege = await this.PrivilegesService.createPrivilege(data);
            res.status(201).json(privilege);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getPrivileges(req, res) {
        try {
            const privileges = await this.PrivilegesService.getPrivileges();
            res.status(200).json(privileges);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    async getPrivilegeById(req, res) {
        try {
            const id = req.params.id;
            const privilege = await this.PrivilegesService.getPrivilegeById(id);
            res.status(200).json(privilege);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    async updatePrivilege(req, res) {
        try {
            const id = req.params.id;
            const data = req.body;
            const privilege = await this.PrivilegesService.updatePrivilege(id, data);
            res.status(200).json(privilege);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    async deletePrivilege(req, res) {
        try {
            const id = req.params.id;
            const privilege = await this.PrivilegesService.deletePrivilege(id);
            res.status(200).json(privilege);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}