import {
  getAllBedroomsRepository,
  getBedroomByIdRepository,
  createBedroomRepository,
  updateBedroomRepository,
  deleteBedroomRepository,
  addComfortToBedroomRepository,
  updateBedroomComfortRepository,
  removeComfortFromBedroomRepository
} from "../repositories/Bedrom_Repository.js";

export const getAllBedroomsService = async () => {
  return await getAllBedroomsRepository();
};

export const getBedroomByIdService = async (id) => {
  return await getBedroomByIdRepository(id);
};

export const createBedroomService = async (bedroomData) => {
  return await createBedroomRepository(bedroomData);
};

export const updateBedroomService = async (id, bedroomData) => {
  return await updateBedroomRepository(id, bedroomData);
};

export const deleteBedroomService = async (id) => {
  return await deleteBedroomRepository(id);
};

export const addComfortToBedroomService = async (bedroomComfortData) => {
  return await addComfortToBedroomRepository(bedroomComfortData);
};

export const updateBedroomComfortService = async (idRoomComforts, updateData) => {
  return await updateBedroomComfortRepository(idRoomComforts, updateData);
};

export const removeComfortFromBedroomService = async (idRoomComforts) => {
  return await removeComfortFromBedroomRepository(idRoomComforts);
};
