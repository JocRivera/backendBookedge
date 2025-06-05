import {
    getAllReservations,
    getReservationsById,
    createReservations,
    updateReservations,
    addCompanions,
    addPlans,
    updateCompanions,
    deleteCompanions,
    changeStatusReservations,
    addCabins,
    addBedrooms,
    addService
} from "../repositories/Reservations_Repository.js";
import { PaymentsReservations } from "../models/Payments_Reservations_model.js";

export async function getAllReservationsService() {
    return await getAllReservations();
}

export async function getReservationsByIdService(id) {
    return await getReservationsById(id);
  }

export async function createReservationsService(reservationsData) {
    return await createReservations(reservationsData);
}

export async function updateReservationsService(id, reservationsData) {
    return await updateReservations(id, reservationsData);

}

export const addCompanionsServices = async (idReservation, idCompanions) => {
    return addCompanions(idReservation, idCompanions);
};

// En el archivo de servicios
export const addPaymentToReservationService = async (idReservation, idPayments) => {
  try {
    // Verificar si ya existe la relación
    const existingRelation = await PaymentsReservations.findOne({
      where: { idReservation, idPayments }
    });

    if (existingRelation) {
      throw new Error("Este pago ya está asociado a la reserva");
    }

    // Crear la relación
    await PaymentsReservations.create({ 
      idReservation, 
      idPayments,
      amountApplied: await getPaymentAmount(idPayments) // Función para obtener el monto
    });
    
  } catch (error) {
    console.error("Error en addPaymentToReservationService:", error);
    throw error;
  }
};

export const addPlansServices = async (idReservation, idPlan) => {
    console.log('Datos enviados al repositorio:', { idReservation, idPlan });
    return addPlans({ idReservation, idPlan });
}

export const updateCompanionsService = async (idReservationsCompanions, idCompanions, idReservation) => {
    return await updateCompanions(idReservationsCompanions, idReservation, idCompanions);
};

export const deleteCompanionsService = async (idReservationsCompanions) => {
    return await deleteCompanions(idReservationsCompanions);
};
export const changeStatusReservationsService = async (id, status) => {
    console.log("ID recibido en el servicio:", id); 
    return await changeStatusReservations(id, status);
}
export const addCabinService = async (idReservation, idCabin) =>{
  return  addCabins({idReservation, idCabin});
}
export const addBedroomsService = async (idReservation,idRoom) =>{
  return addBedrooms({idReservation,idRoom});
}
export const addServiceService = async (idReservation, Id_Service) =>{
  return addServices({idReservation, Id_Service});
}