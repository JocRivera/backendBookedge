import { CabinsComforts } from "../models/Cabins_Comforts.js";

export const assignComfortsToCabinRepository = async ({
  idCabin,
  comforts, // Array de idComfort
}) => {
  const dataToInsert = comforts.map((idComfort) => ({
    idCabin,
    idComfort, 
  }));

 
  return await CabinsComforts.bulkCreate(dataToInsert, {
  });
};


export const updateGroupedComfortsByCabinRepository = async ({
  idCabin,
  comforts, 
}) => {
  // 1. Eliminar  las asociaciones de comodidades existentes para esta cabaña
  await CabinsComforts.destroy({ where: { idCabin } });

  // 2. Si se proporciona un nuevo array de comodidades (y no está vacío), crearlas
  if (comforts && comforts.length > 0) {
    const dataToInsert = comforts.map((idComfort) => ({
      idCabin,
      idComfort,
    }));
    // Crea las nuevas 
    return await CabinsComforts.bulkCreate(dataToInsert);
  }

  
  return []; // Devuelve un array vacío para indicar que no se crearon nuevas (o que el resultado es un conjunto vacío).
};