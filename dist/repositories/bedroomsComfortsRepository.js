import { BedroomsComforts } from "../models/Bedrooms_Comforts.js";


export const assignComfortsToBedroomRepository = async ({ idRoom, comforts }) => {
  const now = new Date();
  const dataToInsert = comforts.map((idComfort) => ({
    idRoom,
    idComfort,
  
  }));
  return await BedroomsComforts.bulkCreate(dataToInsert);
};

export const updateGroupedComfortsByBedroomRepository = async ({
  idRoom,
  comforts, 
}) => {
  // 1. Eliminar  las asociaciones de comodidades existentes para esta cabaña
  await BedroomsComforts.destroy({ where: { idRoom } });

  // 2. Si se proporciona un nuevo array de comodidades (y no está vacío), crearlas
  if (comforts && comforts.length > 0) {
    const dataToInsert = comforts.map((idComfort) => ({
      idRoom,
      idComfort,
    }));
    // Crea las nuevas 
    return await BedroomsComforts.bulkCreate(dataToInsert);
  }

  
  return []; // Devuelve un array vacío para indicar que no se crearon nuevas (o que el resultado es un conjunto vacío).
};