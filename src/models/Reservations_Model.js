import { DataTypes, Sequelize } from "sequelize";  
import { database } from "../config/Database.js";    

export const Reservations = database.define(
    "Reservations",
    {
        ID_Reservation: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        NameClient: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        DocumentType: {
            type: DataTypes.ENUM("Cédula de ciudadanía", "Cédula de extranjería", "Pasaporte"), 
            defaultValue: "Cédula de ciudadanía",
            validate: {
                isIn: [["Cédula de ciudadanía", "Cédula de extranjería", "Pasaporte"]],
            }
        },
        Plan: {
            type: DataTypes.ENUM("Día de sol", "Empresarial", "Romántico", "Pasadía Cumpleaños", "Amanecida"),
            allowNull: false,
            validate: {
                isIn: [["Día de sol", "Empresarial", "Romántico", "Pasadía Cumpleaños", "Amanecida"]],
            }
        },
        StartDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate: {
                notEmpty: true,
                isAfter: {
                    args: new Date().toISOString().split('T')[0], // Formato: 'Año-Mes-Dia'
                    msg: "La fecha de inicio no puede ser anterior a la fecha actual."
                }
            }
        },
        EndDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate: {
                notEmpty: true,
                isAfterStartDate(value) {
                    if (new Date(value) <= new Date(this.startdate)) {
                        throw new Error("La fecha de finalización no puede ser anterior a la fecha de inicio.");
                    }
                }
            }
        },
        Price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            validate: {
                notEmpty: true,
                isDecimal: {
                    msg: "El precio debe ser un número decimal válido."
                },
                min: {
                    args: [0.01], //Que el precio sea por lo menos 0.01
                    msg: "El precio debe ser mayor a 0."
                }
            }
        },
        Status: {
            type: DataTypes.ENUM("Reservado", "Confirmado", "Pendiente", "Anulado"),
            allowNull: false,
            defaultValue: "Reservado",
            validate: {
                notEmpty: {
                    msg: "El estado no puede estar vacío."
                },
            },
        },
    }, 
    {
        tableName: "Reservations",
        timestamps: false,
    }
);
