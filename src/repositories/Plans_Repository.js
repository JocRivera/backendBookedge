import { Plans } from "../models/Plans_Model.js";
import { Services } from "../models/Services_Model.js";
import { Cabins } from "../models/Cabin_Model.js";
import { Bedrooms } from "../models/Bedrooms_Model.js";
import { PlanCabinModel } from "../models/Plans_Cabin_Model.js";
import { PlanBedroomModel } from "../models/Plans_Bedroom_Model.js";
import { Sequelize } from "sequelize";

export const getServicesPerPlan = async () => {
    return await Services.findAll({
        where: {
            StatusServices: true,
        },
    });
}

export const getUniqueCapacitiesCabin = async () => {
    return await Cabins.findAll({
        attributes: [
            [Sequelize.fn('DISTINCT', Sequelize.col('capacity')), 'capacity']
        ],
        where: {
            status: "En Servicio"
        },
        order: [['capacity', 'ASC']]
    });
}
export const getUniqueCapacitiesBedroom = async () => {
    return await Bedrooms.findAll({
        attributes: [
            [Sequelize.fn('DISTINCT', Sequelize.col('capacity')), 'capacity']
        ],
        where: {
            status: "En Servicio"
        },
        order: [['capacity', 'ASC']]
    });
}

export class PlansRepository {
    async getAllPlans() {
        // Obtener todos los planes con sus servicios
        const plans = await Plans.findAll({
            include: [{
                model: Services,
                through: { attributes: ["quantity"] },
            }]
        });

        // Obtener todas las cabañas y habitaciones disponibles
        const availableCabins = await Cabins.findAll({
            where: { status: "En Servicio" },
            order: [['capacity', 'ASC']]
        });
        const availableBedrooms = await Bedrooms.findAll({
            where: { status: "En Servicio" },
            order: [['capacity', 'ASC']]
        });

        // Procesar cada plan
        const plansWithRooms = await Promise.all(plans.map(async (plan) => {
            // Obtener configuración de cabañas y habitaciones para este plan
            const planCabins = await PlanCabinModel.findAll({
                where: { idPlan: plan.idPlan },
                order: [['capacity', 'ASC']]
            });
            const planBedrooms = await PlanBedroomModel.findAll({
                where: { idPlan: plan.idPlan },
                order: [['capacity', 'ASC']]
            });

            // Set para rastrear asignaciones
            const assignedCabins = new Set();
            const assignedBedrooms = new Set();

            // Asignar cabañas
            const cabinAssignments = [];
            for (const planCabin of planCabins) {
                const matchingCabins = availableCabins.filter(cabin =>
                    cabin.capacity === planCabin.capacity &&
                    !assignedCabins.has(cabin.idCabin)
                ).slice(0, planCabin.quantity);

                matchingCabins.forEach(cabin => assignedCabins.add(cabin.idCabin));

                cabinAssignments.push({
                    capacity: planCabin.capacity,
                    requestedQuantity: planCabin.quantity,
                    assignedCabins: matchingCabins,
                    actualQuantity: matchingCabins.length
                });
            }

            // Asignar habitaciones
            const bedroomAssignments = [];
            for (const planBedroom of planBedrooms) {
                const matchingBedrooms = availableBedrooms.filter(bedroom =>
                    bedroom.capacity === planBedroom.capacity &&
                    !assignedBedrooms.has(bedroom.idBedroom)
                ).slice(0, planBedroom.quantity);

                matchingBedrooms.forEach(bedroom => assignedBedrooms.add(bedroom.idBedroom));

                bedroomAssignments.push({
                    capacity: planBedroom.capacity,
                    requestedQuantity: planBedroom.quantity,
                    assignedBedrooms: matchingBedrooms,
                    actualQuantity: matchingBedrooms.length
                });
            }

            return {
                ...plan.get({ plain: true }),
                cabinDistribution: cabinAssignments,
                totalAssignedCabins: [...assignedCabins].length,
                bedroomDistribution: bedroomAssignments,
                totalAssignedBedrooms: [...assignedBedrooms].length
            };
        }));

        return plansWithRooms;
    }

    async getPlanById(id) {
        const plan = await Plans.findByPk(id, {
            include: [{
                model: Services,
                through: { attributes: [] },
            }]
        });

        const planCabins = await PlanCabinModel.findAll({
            where: { idPlan: id },
            order: [['capacity', 'ASC']]
        });
        const planBedrooms = await PlanBedroomModel.findAll({
            where: { idPlan: id },
            order: [['capacity', 'ASC']]
        });

        // Obtener todas las cabañas y habitaciones disponibles
        const availableCabins = await Cabins.findAll({
            where: { status: "En Servicio" },
            order: [['capacity', 'ASC']]
        });
        const availableBedrooms = await Bedrooms.findAll({
            where: { status: "En Servicio" },
            order: [['capacity', 'ASC']]
        });

        // Set para rastrear asignaciones
        const assignedCabins = new Set();
        const assignedBedrooms = new Set();

        // Asignar cabañas
        const cabinAssignments = [];
        for (const planCabin of planCabins) {
            const matchingCabins = availableCabins.filter(cabin =>
                cabin.capacity === planCabin.capacity &&
                !assignedCabins.has(cabin.idCabin)
            ).slice(0, planCabin.quantity);

            matchingCabins.forEach(cabin => assignedCabins.add(cabin.idCabin));

            cabinAssignments.push({
                capacity: planCabin.capacity,
                requestedQuantity: planCabin.quantity,
                assignedCabins: matchingCabins,
                actualQuantity: matchingCabins.length
            });
        }

        // Asignar habitaciones
        const bedroomAssignments = [];
        for (const planBedroom of planBedrooms) {
            const matchingBedrooms = availableBedrooms.filter(bedroom =>
                bedroom.capacity === planBedroom.capacity &&
                !assignedBedrooms.has(bedroom.idBedroom)
            ).slice(0, planBedroom.quantity);

            matchingBedrooms.forEach(bedroom => assignedBedrooms.add(bedroom.idBedroom));

            bedroomAssignments.push({
                capacity: planBedroom.capacity,
                requestedQuantity: planBedroom.quantity,
                assignedBedrooms: matchingBedrooms,
                actualQuantity: matchingBedrooms.length
            });
        }

        return {
            plan,
            cabinDistribution: cabinAssignments,
            totalAssignedCabins: [...assignedCabins].length,
            bedroomDistribution: bedroomAssignments,
            totalAssignedBedrooms: [...assignedBedrooms].length
        };
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
