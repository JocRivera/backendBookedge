import { Cabins } from "../models/Cabin_Model.js";
import { Comforts } from "../models/comfort_Model.js";
import { CabinImages } from "../models/CabinImage_Model.js";

// Obtener todas las cabañas (con imágenes primarias y conteo)
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
        attributes: ["idCabinImage", "imagePath", "isPrimary"],
        where: { isPrimary: true }, // Solo imágenes primarias
        required: false,
      },
    ],
  });

  return cabins.map(cabin => {
    const plainCabin = cabin.get({ plain: true });
    plainCabin.imageCount = plainCabin.images ? plainCabin.images.length : 0;
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
        through: { attributes: [] },
      },
      {
        model: CabinImages,
        as: "images",
        attributes: ["idCabinImage", "imagePath", "isPrimary"],
      },
    ],
  });
};

export const createCabinRepository = async (cabinData) => {
  return await Cabins.create(cabinData);
};

export const updateCabinRepository = async (id, cabinData) => {
  const [updated] = await Cabins.update(cabinData, { 
    where: { idCabin: id } 
  });
  
  if (updated) {
    const updatedCabin = await getCabinByIdRepository(id);
    return updatedCabin;
  }
  return null;
};

export const deleteCabinRepository = async (id) => {
  return await Cabins.destroy({ where: { idCabin: id } });
};