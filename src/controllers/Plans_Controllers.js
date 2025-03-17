import { PlanServices } from "../services/Plan_Services.js";
import { PlanServicesModel } from "../models/Plans_Service_Model.js";
import { PlanCabinModel } from "../models/Plans_Cabin_Model.js";
import { PlanBedroomModel } from "../models/Plans_Bedroom_Model.js";
import { Services } from "../models/Services_Model.js";

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

      // Asociar los servicios al plan
      if (data.services && data.services.length > 0) {
        const newPlan = await this.planServices.createPlan(data);
        await Promise.all(
          data.services.map(async (serviceId) => {
            await PlanServicesModel.create({
              idPlan: newPlan.idPlan,
              idService: serviceId,
            });
          })
        );
        // Buscar los precios de los servicios
        const serviceRecords = await Services.findAll({
          where: { Id_Service: data.services },
        });
        newPlan.total = serviceRecords.reduce(
          (total, service) => total + service.Price,
          0
        );
        await newPlan.save();
        res.status(201).json(newPlan);

        if (data.cabins && data.cabins.length > 0) {
          await Promise.all(
            data.cabins.map(async (cabinId) => {
              await PlanCabinModel.create({
                idPlan: newPlan.idPlan,
                idCabin: cabinId,
              });
            })
          );
        }
        if (data.bedrooms && data.bedrooms.length > 0) {
          await Promise.all(
            data.bedrooms.map(async (bedroomId) => {
              await PlanBedroomModel.create({
                idPlan: newPlan.idPlan,
                idBedroom: bedroomId,
              });
            })
          );
        }
      } else {
        res.status(400).json({ message: "Servicios obligatorios" });
      }

      // Calcular el total sumando los precios
    } catch (error) {
      res.status(400).json({ error: error.message });
      console.log(error);
    }
  }

  async updatePlan(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      const updatedPlan = await this.planServices.updatePlan(id, data);
      // Eliminar y volver a insertar las relaciones
      if (data.services && data.services.length > 0) {
        await PlanServicesModel.destroy({ where: { idPlan: id } }); // Elimina relaciones anteriores
        await Promise.all(
          data.services.map(async (serviceId) => {
            await PlanServicesModel.create({
              idPlan: id,
              idService: serviceId,
            });
          })
        );
      }
      if (data.bedrooms && data.bedrooms.length > 0) {
        await PlanBedroomModel.destroy({ where: { idPlan: id } }); // Elimina relaciones anteriores
        await Promise.all(
          data.bedrooms.map(async (bedroomId) => {
            await PlanBedroomModel.create({
              idPlan: id,
              idBedroom: bedroomId,
            });
          })
        );
      }
      if (data.cabins && data.cabins.length > 0) {
        await PlanCabinModel.destroy({ where: { idPlan: id } }); // Elimina relaciones anteriores
        await Promise.all(
          data.cabins.map(async (cabinId) => {
            await PlanCabinModel.create({
              idPlan: id,
              idCabin: cabinId,
            });
          })
        );
      }
      const serviceRecords = await Services.findAll({
        where: { Id_Service: data.services },
      });
      updatedPlan.total = serviceRecords.reduce(
        (total, service) => total + service.Price,
        0
      );
      await updatedPlan.save()
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
