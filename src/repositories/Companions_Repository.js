import {Companions} from "../models/Companions_Model.js";

export const getAllCompanions = async () => {
    try {
        const companionsList = await Companions.findAll();
        return {
            success: true,
            data: companionsList,
        };
    } catch (error) {
        console.error("Error en getAllCompanions:", error);
        return {
            success: false,
            message: "Error al obtener los Acompañantes",
        };
    }
};

export const getCompanionsById = async (id) => {
    try {
        const companion = await Companions.findByPk(id);
        if (!companion) {
            return {
                success: false,
                error: "Acompañante no encontrado",
            };
        }
        return {
            success: true,
            data: companion,
        };
    } catch (error) {
        console.error("Error en getAllCompanionsById:", error);
        return {
            success: false,
            message: "Error al obtener el Acompañante",
        };
    }
};

export const createCompanion = async (data) => {
    try {
        const newCompanion = await Companions.create(data);
        return {
            success: true,
            data: newCompanion,
        };
    } catch (error) {
        console.error("Error en createCompanions:", error);
        return {
            success: false,
            message: "Error al crear el Acompañante",
        };
    }
};

export const updateCompanion = async (id, data) => {
    try {
        const [updateRows] = await Companions.update(data, {
            where: { idCompanions: id },
        });

        if (updateRows === 0) {
            return {
                success: false,
                error: "No se encontró el Acompañante para actualizar",
            };
        }

        const updatedCompanion = await Companions.findByPk(id);
        return {
            success: true,
            data: updatedCompanion,
        };
    } catch (error) {
        console.error("Error en updateCompanions:", error);
        return {
            success: false,
            error: "Error al actualizar el Acompañante",
        };
    }
};

export const deleteCompanion = async (id) => {
    try {
        const deletedRows = await Companions.destroy({
            where: { idCompanions: id },
        });

        if (deletedRows === 0) {
            return {
                success: false,
                error: "No se encontró el Acompañante para eliminar",
            };
        }
        return {
            success: true,
            message: "Acompañante eliminado exitosamente",
        };
    } catch (error) {
        console.error("Error en deleteCompanions:", error);
        return {
            success: false,
            error: "Error al eliminar el Acompañante",
        };
    }
};
