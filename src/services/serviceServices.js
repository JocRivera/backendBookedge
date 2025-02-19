import{
    getAllServices,
    getCabinById,
} from "../repositories/ServiceRepository.js"

export async function getAllServices(){
    const result= await getAllServices();
    if (!result.succes){
        throw new Error(result.error);
    }
    return result.data
}