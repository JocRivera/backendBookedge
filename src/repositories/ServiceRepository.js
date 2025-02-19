import { Services } from "../models/Services";

export const getAllServices = async () =>{
    try{
        const services = await Cabins.findAll();
        return {
            success: true,
            data: services,
        };
    } catch(err){
        console.error("Error in GetAllServices", err); 
        return {
            success: false,
            error: "Error"
        }
    }
};
export const getServiceById= async (id)=>{ 
    try{
        const service = await Services.findByPk(id);
        if(!service){
            return{
                succes: false,
                error: "Error"
            }
        }
        return{
            succes: true,
            data: service,
        };
    } catch (error){
        console.error("error en getServiceById", error);
        return{
            succes: false,
            error: "Error"
        };
    }
}