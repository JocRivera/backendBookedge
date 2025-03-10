import { Plans } from "../models/Plans_Model.js";
import { Services } from "../models/Services_Model.js";
import { Cabins } from "../models/cabin_Model.js";
import { Bedrooms } from "../models/bedrooms_Model.js";

export class PlansRepository {
    async getAllPlans() {
        return await Plans.findAll({
            include: [
                {
                    model: Services,
                    through: { attributes: [] }, // 🔹 Evita que se muestren datos de la tabla intermedia
                },
                {
                    model: Cabins,
                    through: { attributes: [] }, // 🔹 Evita que se muestren datos de la tabla intermedia
                },
                {
                    model: Bedrooms,
                    through: { attributes: [] }, // 🔹 Evita que se muestren datos de la tabla intermedia
                }
            ]
        });
    }

    async getPlanById(id) {
        return await Plans.findByPk(id, {
            include: [
                {
                    model: Services,
                    through: { attributes: [] }, // 🔹 Evita que se muestren datos de la tabla intermedia
                },
                {
                    model: Cabins,
                    through: { attributes: [] }, // 🔹 Evita que se muestren datos de la tabla intermedia
                },
                {
                    model: Bedrooms,
                    through: { attributes: [] }, // 🔹 Evita que se muestren datos de la tabla intermedia
                }
            ]
        });
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