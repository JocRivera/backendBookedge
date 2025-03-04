import {getAllCompanions as getAllCompanionsService,
    getCompanionsById as getCompanionsByIdService,
    createCompanion as createCompanionService,
    updateCompanion as updateCompanionService,
    deleteCompanion as deleteCompanionRepo
} from '../repositories/Companions_Repository.js'

export async function getAllCompanionRepo(){
    const result = await getAllCompanionsService();
    if(!result.seccess){
        throw new Error(result.message);
    }
    return result.data;
}
export async function getCompanionByIdService(id){
    if (!id || isNaN(id)) {
        throw new Error('Id de acompañante no valido');
    }
    const result = await getCompanionsByIdService(id);
    if(!result.seccess){
        throw new Error(result.message);
    }
    return result.data;
}

export async function createCompanionsService(data){
    if(!data.name || !data.birthdate || !data.age || !data.documentType || !data.documentNumber){
        throw new Error('Falta de datos para añadir el acompañante');
    }
    const result = await createCompanionService(data);
    if (!result.seccess){
        throw new Error(result.message);
    }
    return result.data;
}

export async function updateCompanionsService(id,data) {
    if(!id || isNaN(id)){
        throw new Error('Id de acompañante no valido');
    }
    const result = await updateCompanionService(id,data);
    if (!result.seccess){
        throw new Error(result.message);
    }
    return result.data;
}

export async function deleteCompanionsRepo(id,data) {
    if(!id || isNaN(id)){
        throw new Error('Id de acompañante no valido');
    }  
    const result = await deleteCompanionRepo(id,data);
    if (!result.seccess){
        throw new Error(result.message);
    }
    return result.data;
}
