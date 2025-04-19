import { Cabins } from "../models/Cabin_Model.js";
import { Comforts } from "../models/Comfort_Model.js";
import { CabinImages } from "../models/CabinImage_Model.js";

// Cabin_Repository.js - Actualizar getAllCabinsRepository
export const getAllCabinsRepository = async () => {
  const cabins = await Cabins.findAll({
    include: [
      {
        model: Comforts,
        as: "Comforts",
        attributes: ["idComfort", "name"],
        through: { attributes: [] },
      },
      {
        model: CabinImages,
        as: "images",
        attributes: ["idCabinImage"],
      },
    ],
  });
  
  // Agregar conteo de imágenes y formatear la respuesta
  return cabins.map(cabin => {
    const plainCabin = cabin.get({ plain: true });
    plainCabin.imageCount = plainCabin.images ? plainCabin.images.length : 0;
    delete plainCabin.images; // Opcional: eliminar el array de imágenes para reducir el tamaño de la respuesta
    return plainCabin;
  });
};

export const getCabinByIdRepository = async (id) => {
  return await Cabins.findByPk(id, {
    include: [
      {
        model: Comforts,
        as: "Comforts",
        attributes: ["idComfort", "name"],
      },
    ],
  });
};

export const createCabinRepository = async (cabinData) => {
  return await Cabins.create(cabinData);
};

export const updateCabinRepository = async (id, cabinData) => {
  return await Cabins.update(cabinData, { where: { idCabin: id } });
};

export const deleteCabinRepository = async (id) => {
  return await Cabins.destroy({ where: { idCabin: id } });
};


