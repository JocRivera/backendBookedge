import { PlanProgramedServices } from "../services/Plan_Programed_Service.js";
import { validationResult } from "express-validator";

export class PlanProgramedController {
    constructor() {
        this.PlanProgramedServices = new PlanProgramedServices
    }

    async getAllProgramedPlans(req, res) {
        try {
            const plans = await this.PlanProgramedServices.getAllPlans();
            res.status(200).json(plans);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getPlanProgramedById(req, res) {
        try {
            const { id } = req.params;
            const plan = await this.PlanProgramedServices.getPlanById(id);
            res.status(200).json(plan);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async createPlanProgramed(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const data = req.body;
            const newPlan = await this.PlanProgramedServices.createPlan(data);
            res.status(201).json(newPlan);
        } catch (error) {
            res.status(500).json({ error: error.message });
            console.log(error)
        }
    }

    async updatePlanProgramed(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const { id } = req.params;
            const data = req.body;
            const updatedPlan = await this.PlanProgramedServices.updatePlan(id, data);
            res.status(200).json(updatedPlan);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deletePlanProgramed(req, res) {
        try {
            const { id } = req.params;
            await this.PlanProgramedServices.deletePlan(id);
            res.status(200).json({ message: `Plan programado ${id} eliminado con éxito}` });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}