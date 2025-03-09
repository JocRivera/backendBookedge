import { DataTypes } from "sequelize";
import { database } from "../config/database.js";

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
        },
        idCompanions: {
            type: DataTypes.INTEGER,
            allowNull:false,

        }
    },{
        tableName: 'ReservationsCompanions',
        timestamps:false,
    }
)