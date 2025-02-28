import {
    getAllReservations as getAllReservationsRepo,
    getReservationsById as getReservationsByIdRepo,
    createReservations as createReservationsRepo,
    updateReservations as updateReservationsRepo
} from "../repositories/Reservations_Repository.js";

export async function getAllReservations() {
    const result = await getAllReservationsRepo();
    if (!result.success) {
        throw new Error(result.message);
    }
    return result.data;
}

export async function getReservationsById(id) {
    if (!id || isNaN(id)) {
        throw new Error("ID de reserva inválido");
    }
    const result = await getReservationsByIdRepo(id);
    if (!result.success) {
        throw new Error(result.message);
    }
    return result.data;
}

export async function createReservations(data) {
    if (!data.nameClient || !data.documentType || !data.plan || !data.startDate || !data.endDate || !data.price || !data.status || !data.idCompanios) {
        throw new Error("Faltan datos para crear la reserva");
    }
    const result = await createReservationsRepo(data);
    if (!result.success) {
        throw new Error(result.message);
    }
    return result.data;
}

export async function updateReservations(id, data) {
    if (!id || isNaN(id)) {
        throw new Error("ID de reserva inválido");
    }
    const result = await updateReservationsRepo(id, data);  
    if (!result.success) {
        throw new Error(result.message);
    }
    return result.data;
}
