import express from "express";
import{
    getAllCompanionsController,
    getCompanionsByIdController,
    createCompanionController,
    updateCompanionController,
    deleteCompanionController

} from "../controllers/Companions_Controllers.js";
const router = express.Router();

router.get("/", getAllCompanionsController);
router.get("/:id", getCompanionsByIdController);
router.post("/",createCompanionController);
router.put("/:id", updateCompanionController);
router.delete("/:id",deleteCompanionController);

export default router;