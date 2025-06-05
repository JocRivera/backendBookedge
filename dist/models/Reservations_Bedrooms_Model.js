import { DataTypes } from "sequelize";
import { database } from "../config/database.js";
import { Bedrooms } from "./bedrooms_Model.js"
import { Reservations } from "./Reservations_Model.js";
export const ReservationsBedrooms = database.define(
   "ReservationsBedrooms",
   {
      idReserservationsBedrooms:{
         type:DataTypes.INTEGER,
         primaryKey:true,
         autoIncrement:true
      },
      idReservation:{
         type:DataTypes.INTEGER,
         allowNull:false,
         references:{
            model:Reservations,
            key:"idReservation"
         }
      },
      idRoom:{
         type:DataTypes.INTEGER,
         allowNull:false,
         references:{
            model:Bedrooms,
            key:"idBedroom"
         }
      }
   },{
      tableName:'ReservationsBedrooms',
      timestamps:false
   }
)