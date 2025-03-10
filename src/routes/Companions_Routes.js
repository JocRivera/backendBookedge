import express from "express";
import{
    getAllCompanionsController,
    getCompanionsByIdController,
    createCompanionController,
    updateCompanionController,
    deleteCompanionController

} from "../controllers/Companions_Controllers.js";
import {createCompanionValidation,updateCompanionValidation,getCompanionById,deleteCompanionValidation} from "../middlewares/Validate_Companions.js"
const router = express.Router();

router.get("/", getAllCompanionsController);
router.get("/:id", getCompanionById,getCompanionsByIdController);
router.post("/",createCompanionValidation, createCompanionController);
router.put("/:id",updateCompanionValidation,updateCompanionController);
router.delete("/:id", deleteCompanionValidation,deleteCompanionController);

export default router;