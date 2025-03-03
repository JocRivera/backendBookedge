import{
    getAllCompanionsService,
    getCompanionsByIdService,
    createCompanionService,
    updateCompanionService,
    deleteCompanionService,
} from "../services/Companions_Services.js"

export const getAllCompanionsController = async (req, res) => {
    try {
        const companions = await getAllCompanionsService();
        res.status(200).json(companions);
    }catch(error){
        res.status(500).json({ error: error.message});
    }
};

export const getCompanionsByIdController = async (req, res) => {
    try{
        const{ id }=req.params;
        const companion = await getCompanionsByIdService(id);
        res.status(200).json(companion);
    }catch(error){
        res.status(500).json({ error: error.message});
    }
};

export const createCompanionController = async (req, res) => {
    try{
        const data = req.body;
        const newCompanion= await createCompanionService(data);
        res.status(201).json(newCompanion);
    }catch(error){
        res.status(400).json({ error: error.message});
    }
};

export const updateCompanionController = async (req, res) => {
    try{
        const{id}=req.params;
        const data = req.body;
        const updateCompanion =await updateCompanionService (id,data);
        res.status(200).json(updateCompanion);
    }catch{
        res.status(400).json({ error: "Actulizacion de acompañante invalida" });
    }
};

export const deleteCompanionController = async (req, res) => {
    try{
        const{id}=req.params;
        const data= req.body;
        const deleteCompanion = await deleteCompanionService(id,data);
        res.status(200).json(deleteCompanion);
    }catch(error){
        res.status(500).json({ error: error.message});
    }
};