import {
  assignComfortsToBedroomRepository,
  updateGroupedComfortsByBedroomRepository,

} from "../repositories/bedroomsComfortsRepository.js";

export const assignComfortsToBedroomService = async (data) => {
  return await assignComfortsToBedroomRepository(data);
};

export const updateGroupedComfortsByBedroomService = async (data) => {
  return await updateGroupedComfortsByBedroomRepository(data);
};

