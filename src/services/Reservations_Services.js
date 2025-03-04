import {
    getAllReservations,
    getReservationsById, 
    createReservations,
    updateReservations,
} from "../repositories/Reservations_Repository.js";

export async function getAllReservationsService() {
    const result = await getAllReservations();
    if (!result.success) {
        throw new Error(result.message);
    }
    return result.data;
}

export async function getReservationsByIdService(id) {
    if (!id || isNaN(id)) {
        throw new Error("ID de reserva inválido");
    }
    const result = await getReservationsById(id);
    if (!result.success) {
        throw new Error(result.message);
    }
    return result.data;
}

export async function createReservationsService(data) {
    if (!data.nameClient || !data.documentType || !data.plan || !data.startDate || !data.endDate || !data.price || !data.status || !data.idCompanios) {
        throw new Error("Faltan datos para crear la reserva");
    }
    const result = await createReservations(data);
    if (!result.success) {
        throw new Error(result.message);
    }
    return result.data;
}

export async function updateReservationsService(id, data) {
    if (!id || isNaN(id)) {
        throw new Error("ID de reserva inválido");
    }
    const result = await updateReservations(id, data);  
    if (!result.success) {
        throw new Error(result.message);
    }
    return result.data;
}
