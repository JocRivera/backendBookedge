import {
  assignComfortsToCabinRepository,
  updateGroupedComfortsByCabinRepository,
} from "../repositories/CabinComforts_Repository.js";

// Servicio para asignar (añadir) comodidades a una cabaña
// Usado típicamente al crear una cabaña o si tienes una función específica para "añadir más comodidades"
export const assignComfortsToCabinService = async (data) => {
  // data debería ser un objeto como { idCabin: ..., comforts: [idComfort1, idComfort2] }
  // Lógica de negocio: ¿Existe la cabaña? ¿Existen las comodidades?
  // (Aunque las FK en la BD deberían manejar esto si los IDs no existen)
  // Podrías verificar aquí que 'comforts' no sea un array vacío si es un requisito.
  return await assignComfortsToCabinRepository(data);
};

// Servicio para actualizar el conjunto completo de comodidades de una cabaña
// (elimina las antiguas y establece las nuevas)
export const updateGroupedComfortsByCabinService = async (data) => {
  // data debería ser un objeto como { idCabin: ..., comforts: [idComfort1, idComfort2] }
  // Lógica de negocio: ¿Existe la cabaña?
  // Si `data.comforts` es un array vacío, efectivamente se quitarán todas las comodidades.
  return await updateGroupedComfortsByCabinRepository(data);
};

