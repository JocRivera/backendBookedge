import { PermissionService } from "../services/Permissions_Services.js";
import bcrypt from "bcryptjs";

export class PermissionsController {
    constructor() {
        this.PermissionService = new PermissionService();
    }
    async createPermission(req, res) {
        try {
            const data = req.body;
            const permission = await this.PermissionService.createPermission(data);
            res.status(201).json(permission);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    async getPermissions(req, res) {
        try {
            const permissions = await this.PermissionService.getPermissions();
            res.status(200).json(permissions);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    async getPermissionById(req, res) {
        try {
            const id = req.params.id;
            const permission = await this.PermissionService.getPermissionById(id);
            res.status(200).json(permission);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    async updatePermission(req, res) {
        try {
            const id = req.params.id;
            const data = req.body;
            const permission = await this.PermissionService.updatePermission(id, data);
            res.status(200).json(permission);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    async deletePermission(req, res) {
        try {
            const id = req.params.id;
            const permission = await this.PermissionService.deletePermission(id);
            res.status(200).json(permission);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    async addPrivilege(req, res) {
        try {
            const { idPrivilege, idPermission } = req.body;
            const privilege = await this.PermissionService.addPrivilege(idPrivilege, idPermission);
            res.status(200).json(privilege);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

}