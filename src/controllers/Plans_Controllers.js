import { PlanServices } from "../services/Plan_Services.js";

export class PlansControllers{
    constructor() {
        this.planServices = new PlanServices();
    }
    async getAllPlans(req, res) {
        try {
            const plans = await this.planServices.getAllPlans();
            res.status(200).json(plans);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getPlanById(req, res) {
        try {
            const { id } = req.params;
            const plan = await this.planServices.getPlanById(id);
            res.status(200).json(plan);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async createPlan(req, res) {
        try {
            const data = req.body;
            const newPlan = await this.planServices.createPlan(data);
            res.status(201).json(newPlan);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async updatePlan(req, res) {
        try {
            const { id } = req.params;
            const data = req.body;
            const updatedPlan = await this.planServices.updatePlan(id, data);
            res.status(200).json(updatedPlan);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async deletePlan(req, res) {
        try {
            const { id } = req.params;
            await this.planServices.deletePlan(id);
            res.status(200).json({ message: `Plan ${id} eliminado con éxito` });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}