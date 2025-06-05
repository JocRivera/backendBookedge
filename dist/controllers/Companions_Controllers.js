import { validationResult } from "express-validator";
import {
    getAllCompanionsService,
    getCompanionsByIdService,
    createCompanionService,
    updateCompanionService,
    deleteCompanionsService,
} from "../services/Companions_Services.js"

export const getAllCompanionsController = async (req, res) => {
    try {
        const companions = await getAllCompanionsService();
        res.status(200).json(companions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getCompanionsByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const companion = await getCompanionsByIdService(id);
        res.status(200).json(companion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createCompanionController = async (req, res) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
        return res.status(400).json(erros.array());
    }
    try {
        console.log("Request body received:", req.body); // Verificar qué datos llegan
        const companionsData = {
            ...req.body
        };
        const companion = await createCompanionService(companionsData);
        res.status(201).json(companion);
    } catch (error) {
        console.error("Error:", error.message);
        res.status(400).json({ error: error.message });
    }
};

export const updateCompanionController = async (req, res) => {
    try {
        const { id } = req.params;
        const companionsData = req.body;
        const updateCompanion = await updateCompanionService(id, companionsData);
        res.status(200).json(updateCompanion);
    } catch {
        res.status(400).json({ error: "Actulizacion de acompañante invalida" });
    }
};

export const deleteCompanionController = async (req, res) => {
    try {
        const { id } = req.params;
        const companionsData = req.body;
        const deleteCompanion = await deleteCompanionsService(id, companionsData);
        res.status(200).json(deleteCompanion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};