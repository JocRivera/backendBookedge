import {
  getAllCabinsRepository,
  getCabinByIdRepository,
  createCabinRepository,
  updateCabinRepository,
  deleteCabinRepository
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

