import {
    getAllBeedromsRepository,
    getBeedromByIdRepository,
    createBeedromRepository,
    updateBeedroomRepository,
    deleteBeedroomRepository,
    addComfortBedrom,
    updateBeedroomComfortRepository,
    removeComfortFromBeedroomRepository,
    getBeedroomWithComfortsRepository,
    changeStatusBedrom,
  } from "../repositories/Bedrom_Repository.js";
  
  // Servicios para habitaciones (Bedrooms)
  export const getAllBedromService = async () => {
    return await getAllBeedromsRepository();
  };
  
  export const getBeedromByIdService = async (id) => {
    return await getBeedromByIdRepository(id);
  };
  
  
  export const createBeedroomService = async (bedroomData) => {
    return await createBeedromRepository(bedroomData);
  };
  
  export const updateBeedroomService = async (id, bedroomData) => {
    return await updateBeedroomRepository(id, bedroomData);
  };
  
  export const deleteBeedroomService = async (id) => {
    return await deleteBeedroomRepository(id);
  };
  
  export const changeStatusBeedroomService = async (id, status) => {
    return await changeStatusBedrom(id, status);
  };
  

  //Servicios de la comodidades
  export const addComfortToBeedroomService = async (bedroomComfortData) => {
    return await addComfortBedrom(bedroomComfortData);
  };
  
  export const updateBeedroomComfortService = async (idRoomComforts, updateData) => {
    return await updateBeedroomComfortRepository(idRoomComforts, updateData);
  };
  
  export const removeComfortFromBeedroomService = async (idRoomComforts) => {
    return await removeComfortFromBeedroomRepository(idRoomComforts);
  };

  export const getBeedroomWithComfortsService = async (id) => {
    return await getBeedroomWithComfortsRepository(id);
  };