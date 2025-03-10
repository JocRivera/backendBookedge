import {Plans} from "../models/Plans_Model.js";

export class PlansRepository {
    async getAllPlans() {
        return await Plans.findAll();
    }

    async getPlanById(id) {
        return await Plans.findByPk(id);
    }
    async createPlan(data) {
        return await Plans.create(data);
    }
    async updatePlan(id, data) {
        return await Plans.update(data, { where: { idPlan: id } });
    }
    async deletePlan(id) {
        return await Plans.destroy({ where: { idPlan: id } });
    }
}