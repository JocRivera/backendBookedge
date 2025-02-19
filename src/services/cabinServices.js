import {
  getAllCabins as getAllCabinsRepo,
  getCabinById as getCabinByIdRepo,
  createCabin as createCabinRepo,
  updateCabin as updateCabinRepo,
  deleteCabin as deleteCabinRepo,
} from "../repositories/cabinRepository.js";

export async function getAllCabins() {
  const result = await getAllCabinsRepo();
  if (!result.success) {
    throw new Error(result.error);
  }
  return result.data;
}

export async function getCabinById(id) {
  if (!id || isNaN(id)) {
    throw new Error("ID de cabaña inválido");
  }
  const result = await getCabinByIdRepo(id);
  if (!result.success) {
    throw new Error(result.error);
  }
  return result.data;
}

export async function createCabin(data) {
  if (!data.name || !data.description || !data.capacity) {
    throw new Error("Faltan datos obligatorios");
  }

  if (data.capacity < 3 || data.capacity > 7) {
    throw new Error("La capacidad debe estar entre 3 y 7");
  }

  const result = await createCabinRepo(data);
  if (!result.success) {
    throw new Error(result.error);
  }

  return result.data;
}

export async function updateCabin(id, data) {
  if (!id || isNaN(id)) {
    throw new Error("ID de cabaña inválido");
  }
  const existingCabin = await getCabinByIdRepo(id);
  if (!existingCabin.success) {
    throw new Error("Cabaña no encontrada");
  }

  const result = await updateCabinRepo(id, data);
  if (!result.success) {
    throw new Error(result.error);
  }
  return result.data;
}

export async function deleteCabin(id) {
  if (!id || isNaN(id)) {
    throw new Error("ID de cabaña inválido");
  }
  const existingCabin = await getCabinByIdRepo(id);
  if (!existingCabin.success) {
    throw new Error("Cabaña no encontrada");
  }
  const result = await deleteCabinRepo(id);
  if (!result.success) {
    throw new Error(result.error);
  }
  return result.data;
}