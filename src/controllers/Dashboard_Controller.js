import { Reservations } from "../models/Reservations_Model.js";
import { Plans } from "../models/Plans_Model.js";
import { Sequelize } from "sequelize";

export class DashboardController {
    constructor() {
        this.reservations = Reservations;
        this.plans = Plans;
        this.sequelize = Sequelize;
    }

    async getTopPlans(req, res) {
        try {
            res.status(200).json({
                message: "Top 5 plans",
            });
        } catch (error) {
            console.error("Error al obtener los planes más reservados", error);
            res.status(500).json({
                message: "Error al obtener los planes más reservados",
                error: error.message,
            });
        }
    }
}