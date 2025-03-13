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
        nameClient: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        documentType: {
            type: DataTypes.ENUM("Cédula de ciudadanía", "Cédula de extranjería", "Pasaporte"),
            defaultValue: "Cédula de ciudadanía",
            validate: {
                isIn: [["Cédula de ciudadanía", "Cédula de extranjería", "Pasaporte"]],
            }
        },
        plan: {
            type: DataTypes.ENUM("Día de sol", "Empresarial", "Romántico", "Pasadía Cumpleaños", "Amanecida"),
            allowNull: false,
            validate: {
                isIn: [["Día de sol", "Empresarial", "Romántico", "Pasadía Cumpleaños", "Amanecida"]],
            }
        },
        startDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        endDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
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

