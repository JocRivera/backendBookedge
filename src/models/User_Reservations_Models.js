import { DataTypes } from "sequelize";
import { database } from "../config/database.js";
import { Users } from "../models/user_Model.js";
import { Reservations } from "./Reservations_Model.js";

export const UsersReservations = database.define(
    'users_reservations', {
        idUserReservations: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idUser: {
            type: DataTypes.INTEGER,
            references: {
                model: Users,
                key: 'idUser'
            }
        },
        idReservation: {
            type: DataTypes.INTEGER,
            references: {
                model: Reservations,
                key: 'idReservation'
            }
        }
    },{
        tableName: 'UsersReservations',
        timestamps: false
    }
);