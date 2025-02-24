import {
  getAllCabins,
  getCabinById,
  createCabin,
  updateCabin,
  deleteCabin,
  addComforts,
  deleteComforts,
} from "../repositories/Cabin_Repository.js";


export const getAllCabinsService = async () => {
  return await getAllCabins();
};

export const getCabinByIdService = async (id) => {
  return await getCabinById(id);
};

export const createCabinService = async (cabinData) => {
  return await createCabin(cabinData);
};

export const updateCabinService = async (id, cabinData) => {
  return await updateCabin(id, cabinData);
}

export const deleteCabinService = async (id) => {
  return await deleteCabin(id);
};

export const addComfortsService = async (id, comfortId, status = true , Date_entry) => {
  return await addComforts(id, comfortId, status, Date_entry);
};

export const deleteComfortsService = async (cabinId, comfortId) => {
  

  return await deleteComforts(cabinId, comfortId);
};