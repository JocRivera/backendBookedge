import {
    getAllServices,
    getServiceById,
} from "../services/serviceServices.js"

export const getAllCabins = async (req, res) => {
    try{
        const services= await getAllServices
        res.status(200).json(services)
    } catch (error){
        res.status(500).json({error: error.message})
    }
};