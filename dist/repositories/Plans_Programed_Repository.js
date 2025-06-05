// Los repositorios son responsables de interactuar directamente con la base de datos.
// Aquí se colocan las consultas SQL o las operaciones de Sequelize. Permite cambiar la fuente de datos sin afectar otras capas

import { PlansProgramed } from "../models/Plan_Programed_Model.js";
import { Plans } from "../models/Plans_Model.js";

export class PlanProgramedRepository{
    async getAllPlansProgramed() {
        return await PlansProgramed.findAll({
            include: [
                {
                    model: Plans,
                }
            ]
        });
    }
    
    async getPlanProgramedById(id) {
        return await PlansProgramed.findByPk(id,{
            include: [
                {
                    model: Plans,
                }
        ]});
    }

    async createPlanProgramed(data) {
        return await PlansProgramed.create(data);
    }

    async updatePlanProgramed(id, data) {
        return await PlansProgramed.update(data, { where: { idPlanProgramed: id } });
    }

    async deletePlanProgramed(id) {
        return await PlansProgramed.destroy({ where: { idPlanProgramed: id } });
    }
}