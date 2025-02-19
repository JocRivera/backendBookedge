import { Cabins } from "../models/Cabins.js";

export const getAllCabins = async () => {
  try {
    const cabins = await Cabins.findAll(); 
    return {
      success: true,
      data: cabins,
    };
  } catch (error) {
    console.error("Error en getAllCabins:", error);
    return {
      success: false,
      error: "Error al obtener las cabañas",
    };
  }
};

export const getCabinById = async (id) => {
  try {
    const cabin = await Cabins.findByPk(id);

    if (!cabin) {
      return {
        success: false,
        error: "Cabaña no encontrada",
      };
    }

    return {
      success: true,
      data: cabin,
    };
  } catch (error) {
    console.error("Error en getCabinById:", error);
    return {
      success: false,
      error: "Error al obtener la cabaña",
    };
  }
};

export const createCabin = async (data) => {
  try {
    const cabin = await Cabins.create(data);
    return {
      success: true,
      data: cabin,
    };
  } catch (error) {
    console.error("Error en createCabin:", error);
    return {
      success: false,
      error: "Error al crear la cabaña",
    };
  }
};

export const updateCabin = async (id, data) => {
  try {
    const [updatedRows] = await Cabins.update(data, {
      where: { id_cabin: id }, 
    });

    if (updatedRows === 0) {
      return {
        success: false,
        error: "No se encontró la cabaña para actualizar",
      };
    }

    const updatedCabin = await Cabins.findByPk(id);

    return {
      success: true,
      data: updatedCabin,
    };
  } catch (error) {
    console.error("Error en updateCabin:", error);
    return {
      success: false,
      error: "Error al actualizar la cabaña",
    };
  }
};

export const deleteCabin = async (id) => {
  try {
    const cabin = await Cabins.destroy({
      where: { Id_Cabin: id },
    });
    return {
      success: true,
      data: cabin,
    };
  } catch (error) {
    console.error("Error en deleteCabin:", error);
    return {
      success: false,
      error: "Error al eliminar la cabaña",
    };
  }
};
