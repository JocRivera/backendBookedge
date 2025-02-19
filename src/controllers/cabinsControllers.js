import {
  getAllCabins as getAllCabinsService,
  getCabinById as getCabinByIdService,
  createCabin as createCabinService,
  updateCabin as updateCabinService,
  deleteCabin as deleteCabinService,
} from "../services/cabinServices.js";

export const getAllCabinsController = async (req, res) => {
  try {
    const cabins = await getAllCabinsService();
    res.status(200).json(cabins);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCabinByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const cabin = await getCabinByIdService(id);
    res.status(200).json(cabin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createCabinController = async (req, res) => {
  try {
    const data = req.body;
    if (req.file) {
      data.IMAGE = req.file.path;
    }
    const newCabin = await createCabinService(data);
    res.status(201).json(newCabin);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateCabinController = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    if (req.file) {
      data.IMAGE = req.file.path;
    }
    const updatedCabin = await updateCabinService(id, data);
    res.status(200).json(updatedCabin);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteCabinController = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCabin = await deleteCabinService(id);
    res.status(200).json(deletedCabin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};