import { PlanServices } from "../services/Plan_Services.js";
import { PlanServicesModel } from "../models/Plans_Service_Model.js";
import { PlanCabinModel } from "../models/Plans_Cabin_Model.js";
import { PlanBedroomModel } from "../models/Plans_Bedroom_Model.js";
import { Services } from "../models/Services_Model.js";
import { Cabins } from "../models/cabin_Model.js";
import { Bedrooms } from "../models/bedrooms_Model.js";

export class PlansControllers {
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

        // Crear el plan base
        const newPlan = await this.planServices.createPlan(data);

        // Asociar los servicios al plan y calcular el total
        if (data.services && data.services.length > 0) {
            await Promise.all(
                data.services.map(async (service) => {
                    await PlanServicesModel.create({
                        idPlan: newPlan.idPlan,
                        idService: service.id,
                        quantity: service.quantity,
                    });
                })
            );

            // Calcular el total de servicios
            const serviceRecords = await Services.findAll({
                where: {
                    Id_Service: data.services.map(service => service.id)
                }
            });

            newPlan.total = data.services.reduce((total, service) => {
                const serviceRecord = serviceRecords.find(record => record.Id_Service === service.id);
                return total + (serviceRecord ? serviceRecord.Price * service.quantity : 0);
            }, 0);
        }

        // Calcular capacidad total y asociar cabañas
        let totalCapacity = 0;
        if (data.cabins && data.cabins.length > 0) {
            // Procesar cada especificación de cabaña por capacidad
            await Promise.all(
                data.cabins.map(async (cabin) => {
                    await PlanCabinModel.create({
                        idPlan: newPlan.idPlan,
                        capacity: cabin.capacity,
                        quantity: cabin.quantity,
                    });
                    
                    // Agregar a la capacidad total
                    totalCapacity += (cabin.capacity * cabin.quantity);
                })
            );
        }

        // Actualizar la capacidad total del plan
        newPlan.capacity = totalCapacity || 30; // valor por defecto si no hay cabañas
        await newPlan.save();

        res.status(201).json(newPlan);
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
}

  async updatePlan(req, res) {
    try {
        const { id } = req.params;
        const data = req.body;
        
        // Actualizar plan base
        const updatedPlan = await this.planServices.updatePlan(id, data);

        // Actualizar servicios
        if (data.services && data.services.length > 0) {
            await PlanServicesModel.destroy({ where: { idPlan: id } });
            await Promise.all(
                data.services.map(async (service) => {
                    await PlanServicesModel.create({
                        idPlan: id,
                        idService: service.id,
                        quantity: service.quantity,
                    });
                })
            );

            // Recalcular total
            const serviceRecords = await Services.findAll({
                where: {
                    Id_Service: data.services.map(service => service.id)
                }
            });

            updatedPlan.total = data.services.reduce((total, service) => {
                const serviceRecord = serviceRecords.find(record => record.Id_Service === service.id);
                return total + (serviceRecord ? serviceRecord.Price * service.quantity : 0);
            }, 0);
        }

        // Actualizar cabañas y calcular nueva capacidad
        let totalCapacity = 0;
        if (data.cabins && data.cabins.length > 0) {
            await PlanCabinModel.destroy({ where: { idPlan: id } });
            
            await Promise.all(
                data.cabins.map(async (cabin) => {
                    await PlanCabinModel.create({
                        idPlan: id, // Changed from newPlan.idPlan to id
                        capacity: cabin.capacity,
                        quantity: cabin.quantity,
                    });
                    
                    // Agregar a la capacidad total
                    totalCapacity += (cabin.capacity * cabin.quantity);
                })
            );
        }

        // Actualizar capacidad total
        updatedPlan.capacity = totalCapacity || 30;
        // await updatedPlan.save();

        res.status(200).json(updatedPlan);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

  async deletePlan(req, res) {
    try {
      const { id } = req.params;
      await PlanServicesModel.destroy({ where: { idPlan: id } });
      await PlanCabinModel.destroy({ where: { idPlan: id } });
      await PlanBedroomModel.destroy({ where: { idPlan: id } });
      await this.planServices.deletePlan(id);
      res.status(200).json({ message: `Plan ${id} eliminado con éxito` });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
