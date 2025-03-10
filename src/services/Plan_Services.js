import { PlansRepository } from "../repositories/Plans_Repository.js";

export class PlanServices {
    constructor() {
        this.plansRepository = new PlansRepository();
    }

    async getAllPlans() {
        return await this.plansRepository.getAllPlans();
    }

    async getPlanById(id) {
        return await this.plansRepository.getPlanById(id);
    }

    async createPlan(data) {
        return await this.plansRepository.createPlan(data);
    }

    async updatePlan(id, data) {
        return await this.plansRepository.updatePlan(id, data);
    }

    async deletePlan(id) {
        return await this.plansRepository.deletePlan(id);
    }
}