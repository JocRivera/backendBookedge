import {getAllCompanions as getAllCompanionsRepo,
    getCompanionsById as getCompanionsByIdRepo,
    createCompanion as createCompanionsRepo,
    updateCompanion as updateCompanionRepo,
    deleteCompanion as deleteCompanionRepo
} from '../repositories/Companions_Repository.js'

export async function getAllCompanionRepo(){
    const result = await getAllCompanionsRepo();
    if(!result.seccess){
        throw new Error(result.message);
    }
    return result.data;
}
export async function getCompanionByIdRepo(id){
    if (!id || isNaN(id)) {
        throw new Error('Id de acompañante no valido');
    }
    const result = await getCompanionsByIdRepo(id);
    if(!result.seccess){
        throw new Error(result.message);
    }
    return result.data;
}

export async function createCompanionRepo(data){
    if(!data.name || !data.birtdate || !data.age || !data.documentType || !data.documentNumber || !data.idCompanions){
        throw new Error('Falta de datos para añadir el acompañante');

    }
    const result = await createCompanionsRepo(data);
    if (!result.seccess){
        throw new Error(result.message);
    }
    return result.data;
}

export async function updateCompanionsRepo(id,data) {
    if(!id || isNaN(id)){
        throw new Error('Id de acompañante no valido');
    }
    const result = await updateCompanionRepo(id,data);
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
