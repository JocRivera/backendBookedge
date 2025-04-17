import {
  assignComfortsToCabinRepository,
  updateGroupedComfortsByCabinRepository,
  getGroupedComfortsByCabinRepository,
  getAllComfortsForCabinsRepository,
  getCabinsWithoutComfortsRepository,
} from "../repositories/CabinComforts_Repository.js";

export const assignComfortsToCabinService = async (data) => {
  return await assignComfortsToCabinRepository(data);
};

export const updateGroupedComfortsByCabinService = async (data) => {
  return await updateGroupedComfortsByCabinRepository(data);
};

export const getGroupedComfortsByCabinService = async (idCabin) => {
  return await getGroupedComfortsByCabinRepository(idCabin);
};

export const getAllComfortsForCabinsService = async () => {
  return await getAllComfortsForCabinsRepository();
};

export const getCabinsWithoutComfortsService = async () => {
  return await getCabinsWithoutComfortsRepository();
};
