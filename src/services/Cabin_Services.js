import {
  getAllCabinsRepository,
  getCabinByIdRepository,
  createCabinRepository,
  updateCabinRepository,
  deleteCabinRepository,
  addComfortToCabinRepository,
  updateComfortToCabinRepository,
  deleteComfortToCabinRepository,
  getComfortsToCabinRepository,
  getComfortsByCabinIdRepository
} from "../repositories/Cabin_Repository.js";


export const getAllCabinsService = async() =>{
  return await getAllCabinsRepository();
}

export const getCabinByIdService = async (id) =>{
  return await getCabinByIdRepository(id);
}

export const createCabinService = async (cabinData) =>{
  return createCabinRepository(cabinData);
}

export const updateCabinService = async (id,cabinData) =>{
  return await updateCabinRepository(id,cabinData);
}


export const deleteCabinService = async (id) =>{
  return await deleteCabinRepository(id);
}

export const getComfortsByCabinIdService = async (cabinId) => {
  return await getComfortsByCabinIdRepository(cabinId);
};
export const getComfortsToCabinService = async () =>{
   return await getComfortsToCabinRepository();
}
export const addComfortToCabinService = async (cabinComfortData) =>{
  return await addComfortToCabinRepository(cabinComfortData);
}

export const updateComfortToCabinService = async (id,cabinComfortData) =>{
   return await updateComfortToCabinRepository(id,cabinComfortData);
}

export const deleteComfortToCabinService = async (id) =>{
  return await deleteComfortToCabinRepository(id);
}