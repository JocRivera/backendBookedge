import {
    getAllReservations as getAllReservationsRepo,
    getReservationsById as getReservationsByIdRepo,
    createReservations as createReservationsRepo,
    updateReservations as updateReservationsRepo
} from "../repositories/ReservationsRepository.js";

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
    if (!data.nameclient || !data.documenttype || !data.plan || !data.startdate || !data.enddate || !data.price || !data.status) {
        throw new Error("Faltan datos");
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
