import { validationResult } from "express-validator";
import {
  getComfortByIdService,
  createComfortService,
  updateComfortService,
  deleteComfortService,
  getAllComfortsService
} from "../services/Comfort_Services.js";

export const getAllComfortsController = async (req, res) => {
  try {
    const comfort = await getAllComfortsService();
    res.status(200).json(comfort);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllComfortById = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const comfort = await getComfortByIdService(req.params.id);
    if (!comfort) {
      return res.status(404).json({ error: "Comfort not found" });
    }
    res.status(200).json(comfort);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createComfortController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const comfort = await createComfortService(req.body);
    res.status(201).json(comfort);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateComfortController = async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()})
  }
  const { id } = req.params;
  try {
    const comfort = await updateComfortService(id, req.body);
    if (!comfort) {
      return res.status(400).json({ error: "Comfort not found" });
    }
    res.status(200).json(comfort);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteComfortController = async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()})
  }
  const { id } = req.params;
  try {
    const comfort = await deleteComfortService(id);
    if (!comfort) return res.status(400).json({ error: "Comfort not found" });
    res.status(200).json(comfort);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};