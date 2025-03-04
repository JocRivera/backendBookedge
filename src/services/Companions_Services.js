import {getAllCompanions,
    getCompanionsById,
    createCompanion,
    updateCompanion,
    deleteCompanion,
} from '../repositories/Companions_Repository.js'

export async function getAllCompanionsService(){
    const result = await getAllCompanions();
    if(!result.seccess){
        throw new Error(result.message);
    }
    return result.data;
}
export async function getCompanionsByIdService(id){
    if (!id || isNaN(id)) {
        throw new Error('Id de acompañante no valido');
    }
    const result = await getCompanionsById(id);
    if(!result.seccess){
        throw new Error(result.message);
    }
    return result.data;
}

export async function createCompanionService(data){
    if(!data.name || !data.birthdate || !data.age || !data.documentType || !data.documentNumber){
        throw new Error('Falta de datos para añadir el acompañante');
    }
    const result = await createCompanion(data);
    if (!result.seccess){
        throw new Error(result.message);
    }
    return result.data;
}

export async function updateCompanionService(id,data) {
    if(!id || isNaN(id)){
        throw new Error('Id de acompañante no valido');
    }
    const result = await updateCompanion(id,data);
    if (!result.seccess){
        throw new Error(result.message);
    }
    return result.data;
}

export async function deleteCompanionService(id,data) {
    if(!id || isNaN(id)){
        throw new Error('Id de acompañante no valido');
    }  
    const result = await deleteCompanion(id,data);
    if (!result.seccess){
        throw new Error(result.message);
    }
    return result.data;
}
