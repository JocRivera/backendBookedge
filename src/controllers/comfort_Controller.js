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
    const comfort = await getByIdService(id);
    if (!comfort) return res.status(404).json({ error: "Comfort not found" });
    res.status(200).json(comfort);
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
    if (!comfort) {
      return res.status(404).json({ error: "Comfort not found" });
    }
    res.status(200).json(comfort);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteComfortController = async (req, res) => {
  const { id } = req.params;
  try {
    const comfort = await deleteService(id);
    if (!comfort) return res.status(404).json({ error: "Comfort not found" });
    res.status(200).json(comfort);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
