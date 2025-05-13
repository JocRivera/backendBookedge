import { DataTypes } from "sequelize";
import { database } from "../config/database.js";
import { Cabins } from "./cabin_Model.js"
import { Reservations } from "./Reservations_Model.js";
export const ReservationsCabins = database.define(
   "ReservationsCabins",
   {
      idReservationsCabins: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true
      },
      idReservation:{
         type: DataTypes.INTEGER,
         allowNull: false,
         references:{
            model: Reservations,
            key: 'idReservation'
         },
      },
      idCabin:{
         type: DataTypes.INTEGER,
         allowNull: false,
         references:{
            model: Cabins,
            key: 'idCabin'
         }
      }
   },{
      tableName:'ReservationsCabins',
      timestamps:false
   }
)