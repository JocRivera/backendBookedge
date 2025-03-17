import { DataTypes } from "sequelize";
import { database } from "../config/database.js";

export const Reservations = database.define(
    "Reservations",
    {
        idReservation: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        idUser:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'idUser',
            }
        },        
        idPlan: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Plans', 
                key: 'idPlan', 
            },
        },

        startDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        endDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM("Reservado", "Confirmado", "Pendiente", "Anulado"),
            allowNull: false,
            defaultValue: "Reservado",
        },
    },

    {
        tableName: "Reservations",
        timestamps: false,
    }

);
