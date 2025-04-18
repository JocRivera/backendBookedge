import { ServiceService } from '../services/Service_Services.js';
import { validationResult } from 'express-validator';
export class ServicesController {
    constructor() {
        this.ServiceService = new ServiceService();
    }

    async getAllServices(req, res) {
        try {
            const services = await this.ServiceService.getAllServices();
            res.status(200).json(services);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getServiceById(req, res) {
        try {
            const { id } = req.params;
            const service = await this.ServiceService.getServiceById(id);
            res.status(200).json(service);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async createService(req, res) {
        const service = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const newService = await this.ServiceService.createService(service);
            res.status(201).json(newService);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateService(req, res) {
        try {
            const { id } = req.params;
            const data = req.body;
            const updatedService = await this.ServiceService.updateService(id, data);
            res.status(200).json(updatedService);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async deleteService(req, res) {
        try {
            const { id } = req.params;
            const deletedService = await this.ServiceService.deleteService(id);
            res.status(200).json(deletedService);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async changeStatus(req, res) {
        const { id } = req.params;
        const { StatusServices } = req.body;
        try {
            await this.ServiceService.changeStatus(id, StatusServices)
            return res.status(204).send();
        }
        catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

}

