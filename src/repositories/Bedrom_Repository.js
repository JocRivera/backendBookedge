import {Bedrooms} from "../models/bedrooms_Model.js";
import { Comforts } from "../models/Comfort_Model.js";
import {BedroomsComforts} from "../models/Bedrooms_Comforts.js"

export const getAllBeedromsRepository = async () =>{
    return await Bedrooms.findAll();
}

export const getBeedromByIdRepository = async (id) =>{
    return await Bedrooms.findByPk(id)
}

export const createBeedromRepository = async (bedromData) => {
    return await Bedrooms.create(bedromData);
}

export const updateBeedroomRepository = async (id,bedromData) =>{
    return await Bedrooms.update(bedromData,{where:{idRoom : id}});
}

export const deleteBeedroomRepository = async (id) =>{
     return await Bedrooms.destroy({where:{idRoom:id}});
}

export const changeStatusBedrom = async (id,status)=>{
    return await Bedrooms.update(status,{where:{idRoom:id}})
}

export const addComfortBedrom = async (bedromComfortData) => {
    return await BedroomsComforts.create(bedromComfortData);
}

export const getBeedroomWithComfortsRepository = async (id) => {
    return await Bedrooms.findByPk(id, {
        include: [{
            model: Comforts,
            as: "Comforts",
            through: { attributes: ['description', 'dateEntry'] } 
        }]
    });
}

export const updateBeedroomComfortRepository = async (idRoomComforts, updateData) => {
    return await BedroomsComforts.update(updateData, {
        where: { idRoomComforts }
    });
}

export const removeComfortFromBeedroomRepository = async (idRoomComforts) => {
    return await BedroomsComforts.destroy({
        where: { idRoomComforts }
    });
}