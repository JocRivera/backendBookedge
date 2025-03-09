import {
    getAllCompanions,
    getCompanionsById,
    createCompanion,
    updateCompanion,
    deleteCompanion,
} from '../repositories/Companions_Repository.js'

export async function getAllCompanionsService() {
    return await getAllCompanions();

}
export async function getCompanionsByIdService(id) {
   return await getCompanionsById(id);
}

export async function createCompanionService(id) {
    return await createCompanion(data);
    
}

export async function updateCompanionService(id, data) {
    return await updateCompanion(id, data);
}

export async function deleteCompanionsService(id) {
  
    return await deleteCompanion(id);


}