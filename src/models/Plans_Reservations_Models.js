import { DataTypes } from "sequelize";
import { database } from "../config/database.js";
import { Plans } from "../models/Plans_Model.js";
import { Reservations } from "./Reservations_Model.js";

export const PlansReservations = database.define(
    "PlansReservations",
    {
        idPlansReservations: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        idPlans: {
            type: DataTypes.INTEGER,
            references: {
                model: Plans,
                key: "idPlans",

            }
        },
        idReservations: {
            type: DataTypes.INTEGER,
            references: {
                model: Reservations,
                key: "idReservations",
            }
        }
    },{
        tableName: "PlansReservations",
        timestamps: false
    }
)