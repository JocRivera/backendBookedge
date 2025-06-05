import { DataTypes } from "sequelize";
import { database } from "../config/database.js";
import { Payments } from "../models/Payments_Model.js";
import { Reservations } from "./Reservations_Model.js";

export const PaymentsReservations = database.define(
    "PaymentsReservations",
    {
        idPaymentsReservations: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        idPayments: {
            type: DataTypes.INTEGER,
            references: {
                model: Payments,
                key: "idPayments",
            }
        },
        idReservation: {
            type: DataTypes.INTEGER,
            references: {
                model: Reservations,
                key: "idReservation",
            }
        }
    }, {
    tableName: 'PaymentsReservations', //Nombre de la tabla en la base de datos
    timestamps: false


}
)