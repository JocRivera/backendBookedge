import { RolesService } from "../services/Roles_Services.js";
import { validationResult } from "express-validator";

export class RolesController {
    constructor() {
        this.rolesService = new RolesService();
    }

    async findAll(req, res) {
        try {
            const roles = await this.rolesService.findAll();
            return res.status(200).json(roles);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async findById(req, res) {
        const { id } = req.params;
        try {
            const role = await this.rolesService.findById(id);
            return res.status(200).json(role);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async create(req, res) {
        const role = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const newRole = await this.rolesService.create(role);
            return res.status(201).json(newRole);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async addPermission(req, res) {
        const { idPermission, idRol } = req.body;
        try {
            const role = await this.rolesService.addPermission(idPermission, idRol);
            return res.status(200).json(role);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async removePermission(req, res) {
        const { idPermission, idRol } = req.params;
        try {
            await this.rolesService.removePermission(idPermission, idRol);
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async updatePermission(req, res) {
        const { idPermission, idRol } = req.params;
        const permission = req.body;
        try {
            const role = await this.rolesService.updatePermission(permission, idPermission, idRol);
            return res.status(200).json(role);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        const { id } = req.params;
        const role = req.body;
        try {
            const updatedRole = await this.rolesService.update(role, id);
            return res.status(200).json(updatedRole);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async delete(req, res) {
        const { id } = req.params;
        try {
            await this.rolesService.delete(id);
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

