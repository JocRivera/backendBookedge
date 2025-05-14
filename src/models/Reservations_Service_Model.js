import { DataTypes } from "sequelize";
import { database } from "../config/database.js";
import { Services } from "./Services_Model.js"
import { Reservations } from "./Reservations_Model.js";

export const ReservationsService = database.define(
   "ReservationsService",
   {
      idReservationsSevice:{
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true,
      },
      idReservation:{
         type: DataTypes.INTEGER,
         references:{
            model: Reservations,
            key: "idReservations",
         }

      },
      Id_Service:{
         type: DataTypes.INTEGER,
         references:{
            model: Services,
            key: 'Id_Service',
         }
      }
   },{
      timestamps: false,
      tableName:'ReservationsServices'
   }
)