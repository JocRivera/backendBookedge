import {
  getAllCabins,
  getCabinById,
  createCabin,
  updateCabin,
  deleteCabin,
  addComforts,
  changeStatusCabin,
  updateComforts,
  deleteComfortCabin,
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

export const addComfortsService = async (idCabin, idComfort, cabinComfortData) => {
  return await addComforts(idCabin, idComfort, cabinComfortData);
};

export const updateComfortsService = async (idCabinComfort, cabinComfortData) => {
  return await updateComforts(idCabinComfort,cabinComfortData);
};
export const deteleComfortCabinService = async (idCabinComfort) => {
  return await deleteComfortCabin(idCabinComfort);
};

export const changeStatusCabinService = async (id, status) => {
  return await changeStatusCabin(id, status);
};


//comentario de prueba