import {
  getAllComfortsService as getAllService,
  getComfortByIdService as getByIdService,
  createComfortService as createService,
  updateComfortService as updateService,
  deleteComfortService as deleteService,
} from "../services/comfort_services.js";

export const getAllComfortsController = async (req, res) => {
  try {
    const comfort = await getAllService();
    res.status(200).json(comfort);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllComfortById = async (req, res) => {
  const { id } = req.params;
  try {
    return res.status(200).json(await getByIdService(id)); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createComfortController = async (req, res) => {
  try {
    const comfort = await createService(req.body);
    res.status(201).json(comfort);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateComfortController = async (req, res) => {
  const { id } = req.params;
  try {
    const comfort = await updateService(id, req.body);
    res.status(200).json(comfort);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteComfortController = async (req, res) => {
  const { id } = req.params;
  try {
    const comfort = await deleteService(id);
    res.status(200).json(comfort);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
