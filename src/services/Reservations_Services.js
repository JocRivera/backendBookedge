import {
    getAllReservations,
    getReservationsById,
    createReservations,
    updateReservations,
    addCompanions,
    addPayments,
    addPlans,
    updateCompanions,
    deleteCompanions,
    changeStatusReservations
} from "../repositories/Reservations_Repository.js";

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

export const addPaymentsServices = async (idReservation, idPayments) => {
    console.log('Datos enviados al repositorio:', { idReservation, idPayments });
    return addPayments({ idReservation, idPayments });
}

export const addPlansServices = async (idReservation, idPlan) => {
    console.log('Datos enviados al repositorio:', { idReservation, idPlan });
    return addPlans({ idReservation, idPlan });
}

export const updateCompanionsService = async (idReservationsCompanions, idCompanions, idReservation) => {
    return await updateCompanions(idReservationsCompanions, idCompanions, idReservation);
}

export const deleteCompanionsService = async (idReservationsCompanions) => {
    return await deleteCompanions(idReservationsCompanions);
};
export const changeStatusReservationsService = async (id, status) => {
    console.log("ID recibido en el servicio:", idReservationsCompanions); 
    return await changeStatusReservations(id, status);
}
