import { where } from "sequelize";
import { Companions } from "../models/Companions_Model.js";

export const getAllCompanions = async () => {

    return await Companions.findAll();

};

export const getCompanionsById = async (id) => {

    return await Companions.findByPk(id);

};

export const createCompanion = async (companionsData) => {
    return await Companions.create(companionsData
    );

};

export const updateCompanion = async (id, companionsData) => {
    return await Companions.update(data, { where: { idCompanions: id } });
};

export const deleteCompanion = async (id) => {

    return await Companions.destroy({ where: { idCompanions: id } })

};
