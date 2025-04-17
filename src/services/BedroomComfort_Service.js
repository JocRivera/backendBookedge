import {
    assignComfortsToBedroomRepository,
    updateGroupedComfortsByBedroomRepository,
    getGroupedComfortsByBedroomRepository,
    getAllComfortsForBedroomsRepository,
    getBedroomsWithoutComfortsRepository,
  } from "../repositories/bedroomsComfortsRepository.js";
  
  // 1. Servicio para asignar comodidades
  export const assignComfortsToBedroomService = async (data) => {
    return await assignComfortsToBedroomRepository(data);
  };
  
  // 2. Servicio para actualizar comodidades
  export const updateGroupedComfortsByBedroomService = async (data) => {
    return await updateGroupedComfortsByBedroomRepository(data);
  };
  
  // 3. Servicio para obtener comodidades agrupadas
  export const getGroupedComfortsByBedroomService = async (idRoom) => {
    return await getGroupedComfortsByBedroomRepository(idRoom);
  };
  
  // 4. Servicio para listar todas las comodidades asignadas
  export const getAllComfortsForBedroomsService = async () => {
    return await getAllComfortsForBedroomsRepository();
  };
  
  // 5. Servicio para obtener habitaciones sin comodidades
  export const getBedroomsWithoutComfortsService = async () => {
    return await getBedroomsWithoutComfortsRepository();
  };