import { CabinImages } from "../models/CabinImage_Model.js";

export const getCabinImagesRepository = async (cabinId) => {
  return await CabinImages.findAll({ 
    where: { idCabin: cabinId },
    order: [['isPrimary', 'DESC']]
  });
};

export const createCabinImageRepository = async (imageData) => {
  return await CabinImages.create(imageData);
};

export const deleteCabinImageRepository = async (id) => {
  return await CabinImages.destroy({ where: { idCabinImage: id } });
};

export const setPrimaryImageRepository = async (cabinId, imageId) => {
  // Primero, establece todas las imágenes como no primarias
  await CabinImages.update(
    { isPrimary: false },
    { where: { idCabin: cabinId } }
  );
  // Establece la imagen seleccionada como primaria
  return await CabinImages.update(
    { isPrimary: true },
    { where: { idCabinImage: imageId } }
  );
};