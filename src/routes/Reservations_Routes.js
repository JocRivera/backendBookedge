import express from "express";
import { authorize } from "../middlewares/RolesPermissionAuth.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import {
  getAllReservationsController,
  getReservationsByIdController,
  createReservationsController,
  updateReservationsController,
  addCompanions,
  addPaymentToReservationController,
  addPlans,
  updateCompanion,
  deleteCompanions,
  changeStatusReservationsController,
  addCabin,
  addBedrooms,
  addService,
} from "../controllers/Reservations_Controllers.js";
import {
  createReservationValidation,
  updateReservationsValidation,
  getReservationsValidation,
  changeStateReservationsValidation,
  addCompanionValidation,
  addPaymentsValidation,
  addPlansValidation,
  updateCompanionsValidation,
  deleteCompaniosValidation,
  addCabinsValidation,
  addRoomsValidation,
  addServicesValidation,
} from "../middlewares/Validate_Reservations.js";
import {
  getCapacitiesCabins,
  getCapacitiesBedroom,
  getReservationsServicesPer,
} from "../repositories/Reservations_Repository.js";

const router = express.Router();

// Listar cabañas, habitaciones y servicios adicionales en una reserva
router.get("/servicesReservations", async (req, res) => {
  try{
    const services = await getReservationsServicesPer();
    res.status(200).json(services);
  } catch(error){
    res.status(500).json({message: "Error al obtener servicios de la reserva"});
  }
});

router.get("/cabins", async (req,res)=>{
  try{
    const cabin = await getCapacitiesCabins();
    res.status(200).json(cabin);
  }catch(error){
    res.status(500).json({message: error.message});
  }
});

router.get("/bedroomsReservations", async (req, res) => {
  try{
    const bedroom = await getCapacitiesBedroom();
    res.status(200).json(bedroom);
  }catch(error){
    res.status(500).json({message: "Error al obtener habitaciones de la reserva"})
  }
})



// Rutas para las reservas
router.get("/", getAllReservationsController);
router.get(
  "/:idReservation",
  getReservationsValidation,
  getReservationsByIdController
);
router.post("/", createReservationValidation, createReservationsController);
router.put(
  "/:idReservation",
  updateReservationsValidation,
  updateReservationsController
);
router.patch(
  "/:id/status",
  changeStateReservationsValidation,
  changeStatusReservationsController
);

//Ruta para obtener una reserva con sus acompañantes y agregar pagos
router.get(
  "/:idReservation/companions",
  getReservationsValidation,
  getReservationsByIdController
);

//Ruta para agregar un acompañante
router.post(
  "/:idReservation/companions",
  addCompanionValidation,
  addCompanions
);

//Ruta para agregar pagos
router.post(
  "/:idReservation/payments",
  addPaymentsValidation,
  addPaymentToReservationController
);

//Ruta para agregar plan
router.post("/Reservationplans", addPlansValidation, addPlans);

//Ruta para actualizar un acompañante
router.put(
  "/:idReservation/companions/:idReservationsCompanions",
  updateCompanionsValidation,
  updateCompanion
);

//Ruta para eliminar un acompañante
router.delete(
  "/companions/:idReservationsCompanions/ReservationsCompanions",
  deleteCompaniosValidation,
  deleteCompanions
);

//Ruta para agregar Cabañas
router.post("/cabins", addCabinsValidation, addCabin);

//Ruta para agregar Habitaciones
router.post("/bedrooms", addRoomsValidation, addBedrooms);

//Ruta Para agregar servicios
router.post("/services", addServicesValidation, addService);

export default router;
