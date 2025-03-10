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

export async function createCompanionService(companionsData) {
    console.log("Data received in service:", companionsData);
    return await createCompanion(companionsData);
    
}

export async function updateCompanionService(id, companionsData) {
    return await updateCompanion(id, companionsData);
}

export async function deleteCompanionsService(id) {
  
    return await deleteCompanion(id);


}