import {
  getAllCabins,
  getCabinById,
  createCabin,
  updateCabin,
  deleteCabin,
  addComforts,
  changeStatusCabin,
  updateComforts,
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
};

export const deleteCabinService = async (id) => {
  return await deleteCabin(id);
};

export const addComfortsService = async (
  id,
  idComfort,
  description,
  dateEntry
) => {
  return await addComforts(id, idComfort, description, dateEntry);
};

export const updateComfortsService = async (
  id,
  idComfort,
  status,
  dateEntry
) => {
  return await updateComforts(id, idComfort, status, dateEntry);
};

export const changeStatusCabinService = async (id, status) => {
  return await changeStatusCabin(id, status);
};
