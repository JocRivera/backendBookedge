import { DataTypes } from "sequelize";
import { database } from "../config/database.js";
import { Companions } from "./Companions_Model.js";
import { Reservations } from "./Reservations_Model.js";
export const ReservationsCompanions = database.define(
    'ReservationsCompanions',
    {
        idReservationsCompanions:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        idReservation:{
            type: DataTypes.INTEGER,
            allowNull:false,
            references: {
                model: Reservations, 
                key: "idReservation",
            },
        },
        idCompanions: {
            type: DataTypes.INTEGER,
            allowNull:false,
            references: {
                model: Companions,
                key: "idCompanion"

            }

        }
    },{
        tableName: 'ReservationsCompanions',
        timestamps:false,
    }
)