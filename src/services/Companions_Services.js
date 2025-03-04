import {
    getAllCompanions,
    getCompanionsById,
    createCompanion,
    updateCompanion,
    deleteCompanion,
} from '../repositories/Companions_Repository.js'

export async function getAllCompanionsService() {
    const result = await getAllCompanions();
    if (!result.success) {
        throw new Error(result.message);
    }
    return result.data;
}
export async function getCompanionsByIdService(id) {
    if (!id || isNaN(id)) {
        throw new Error('Id de acompañante no valido');
    }
    const result = await getCompanionsById(id);
    if (!result.success) {
        throw new Error(result.message);
    }
    return result.data;
}

// export async function createCompanionService(data){
//     if(!data.name || !data.birthdate || !data.age || !data.documentType || !data.documentNumber){
//         throw new Error('Falta de datos para añadir el acompañante');
//     }
//     const result = await createCompanion(data);
//     if (!result.success){
//         throw new Error("Error al crear el acompañante. Verifica los datos.");
//     }
//     return result.data;
// }
export async function createCompanionService(data) {
    const missingFields = [];
    if (!data.name) missingFields.push('name');
    if (!data.birthdate) missingFields.push('birthdate');
    if (!data.age) missingFields.push('age');
    if (!data.documentType) missingFields.push('documentType');
    if (!data.documentNumber) missingFields.push('documentNumber');

    if (missingFields.length > 0) {
        throw new Error(`Falta de datos para añadir el acompañante: ${missingFields.join(', ')}`);
    }

    const result = await createCompanion(data);

    if (!result.success) {
        throw new Error("Error al crear el acompañante. Verifica los datos.");
    }

    return result.data;
}


export async function updateCompanionService(id, data) {
    if (!id || isNaN(id)) {
        throw new Error('Id de acompañante no valido');
    }
    const result = await updateCompanion(id, data);
    if (!result.success) {
        throw new Error(result.message);
    }
    return result.data;
}

export async function deleteCompanionService(id) {
    if (!id || isNaN(Number(id))) {
        throw new Error("ID de acompañante no válido");
    }

    const result = await deleteCompanion(id);

    if (!result.success) {
        throw new Error("No se pudo eliminar el acompañante");
    }

    return result.data;
}