import { Services } from "../models/Services_Model.js";

export class ServiceRepository {
    async getAllServices() {
        return await Services.findAll();
    }
    async getServiceById(id) {
        return await Services.findByPk(id);
    }
    async createService(data) {
        return await Services.create(data);
    }
    async updateService(id, data) {
        return await Services.update(data, { where: { id_service: id } });
    }
    async deleteService(id) {
        return await Services.destroy({ where: { id_service: id } });
    }
}