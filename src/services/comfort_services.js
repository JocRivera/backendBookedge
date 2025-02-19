import {
  getAllComforts,
  getComfortById,
  createComfort,
  updateComfort,
  deleteComfort,
  
} from "../repositories/comfortsRepository.js";

export async function getAllComfortsService() {
  return await getAllComforts(); 
}

export async function getComfortByIdService(id) {
  return await getComfortById(id);
}

export async function createComfortService(data) {
  return await createComfort(data);
}

export async function updateComfortService(id, data) {
  return await updateComfort(id, data);
}

export async function deleteComfortService(id) {
  return await deleteComfort(id);
}


