import {
  assignComfortsToBedroomRepository,
  updateGroupedComfortsByBedroomRepository,
  getGroupedComfortsByBedroomRepository,
  getAllComfortsForBedroomsRepository,
  getBedroomsWithoutComfortsRepository,
} from "../repositories/bedroomsComfortsRepository.js";

export const assignComfortsToBedroomService = async (data) => {
  return await assignComfortsToBedroomRepository(data);
};

export const updateGroupedComfortsByBedroomService = async (data) => {
  return await updateGroupedComfortsByBedroomRepository(data);
};

export const getGroupedComfortsByBedroomService = async (idRoom) => {
  return await getGroupedComfortsByBedroomRepository(idRoom);
};

export const getAllComfortsForBedroomsService = async () => {
  return await getAllComfortsForBedroomsRepository();
};

export const getBedroomsWithoutComfortsService = async () => {
  return await getBedroomsWithoutComfortsRepository();
};