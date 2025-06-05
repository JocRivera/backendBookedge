import { PlanProgramedRepository } from "../repositories/Plans_Programed_Repository.js";

export class PlanProgramedServices {
    constructor() {
        this.planProgramedRepository = new PlanProgramedRepository();
    }

    async getAllPlans() {
        return await this.planProgramedRepository.getAllPlansProgramed();
    }

    async getPlanById(id) {
        return await this.planProgramedRepository.getPlanProgramedById(id);
    }

    async createPlan(data) {
        const plan = await this.planProgramedRepository.getPlanProgramedById(data.idPlan);
        if (plan && plan.idPlanProgramed != data.idPlanProgramed){
            if(plan.endDate > data.startDate) return Promise.reject("La fecha de inicio debe ser posterior a la fecha de finalización del plan actual");
        };
        return await this.planProgramedRepository.createPlanProgramed(data);
    }

    async updatePlan(id, data) {
        return await this.planProgramedRepository.updatePlanProgramed(id, data);
    }

    async deletePlan(id) {
        return await this.planProgramedRepository.deletePlanProgramed(id);
    }
}