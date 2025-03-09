import {
    getAllReservations,
    getReservationsById,
    createReservations,
    updateReservations,
    addCompanions,
    updateCompanions,
    deleteCompanions
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

export const addCompanionsServices = async(id, idCompanions, name, birthdate, age, documentType,  documentNumber) => {
    return addCompanions(id, idCompanions, name, birthdate, age, documentType, documentNumber);
}

export const updateCompanionsService = async (idReservationsCompanions, idCompanions, idReservations) =>{
    return await updateCompanions(idReservationsCompanions, idCompanions, idReservations);
}

export const deleteCompanionsService = async (idReservationsCompanions) => {
    return await deleteCompanions(idReservationsCompanions);
}

export const changeStatusReservationsService = async (id, status) => {
    return await changeStatusReservations (id,status);
}
