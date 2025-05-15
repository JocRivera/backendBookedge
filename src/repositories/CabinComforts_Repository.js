import { CabinsComforts } from "../models/Cabins_Comforts.js";

// Asignar comodidades a cabaña (para una cabaña NUEVA o para añadir a una existente sin borrar las previas)
export const assignComfortsToCabinRepository = async ({
  idCabin,
  comforts, // Array de idComfort
}) => {
  // Prepara los datos para la inserción masiva
  const dataToInsert = comforts.map((idComfort) => ({
    idCabin,
    idComfort, // idComfort es el valor del elemento del array 'comforts'
  }));

  // Crea las nuevas asociaciones en la tabla CabinsComforts
  // Si tienes el índice único (idCabin, idComfort) en tu modelo/tabla:
  //   - Si una combinación ya existe, fallará a menos que uses `ignoreDuplicates: true` o `updateOnDuplicate`.
  //   - `ignoreDuplicates: true` es útil si simplemente quieres asegurarte de que las asociaciones existan
  //     y no te importa si algunas ya estaban.
  return await CabinsComforts.bulkCreate(dataToInsert, {
    // ignoreDuplicates: true, // Considera esto si 'comforts' podría tener IDs ya asociados y no quieres un error.
  });
};

// Actualizar el conjunto COMPLETO de comodidades para una cabaña
// (Elimina todas las existentes y luego crea las nuevas especificadas)
export const updateGroupedComfortsByCabinRepository = async ({
  idCabin,
  comforts, // Array de idComfort que representa el NUEVO conjunto completo de comodidades
}) => {
  // 1. Eliminar TODAS las asociaciones de comodidades existentes para esta cabaña
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