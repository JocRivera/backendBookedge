import { CabinImages } from "../models/CabinImage_Model.js";

export const getCabinImagesRepository = async (cabinId) => {
  return await CabinImages.findAll({ 
    where: { idCabin: cabinId },
    order: [['isPrimary', 'DESC']] 
  });
};

export const getCabinImageByIdRepository = async (imageId) => {
  return await CabinImages.findByPk(imageId); // 👈 Nuevo método añadido
};

export const createCabinImageRepository = async (imageData) => {
  return await CabinImages.create(imageData);
};

export const deleteCabinImageRepository = async (id) => {
  return await CabinImages.destroy({ where: { idCabinImage: id } });
};

export const setPrimaryImageRepository = async (cabinId, imageId) => {
  // Verificar que la imagen pertenece a la cabaña (👈 Seguridad añadida)
  const image = await CabinImages.findOne({
    where: {
      idCabinImage: imageId,
      idCabin: cabinId
    }
  });

  if (!image) throw new Error("La imagen no pertenece a esta cabaña");

  // 1. Desmarcar todas como no primarias
  await CabinImages.update(
    { isPrimary: false },
    { where: { idCabin: cabinId } }
  );

  // 2. Marcar la seleccionada como primaria
  return await CabinImages.update(
    { isPrimary: true },
    { where: { idCabinImage: imageId } }
  );
};