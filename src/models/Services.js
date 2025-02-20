import {DataTypes}  from "sequelize";
import { database } from "../config/database";
export const Services = database.define(
    "Services",
    {Id_Service: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
        },
    },
    Description: {
        type: DataTypes.STRING(250),
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    Price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    StatusServices: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        validate: {
            isAlphanumeric: true,     // will only allow alphanumeric characters, so "_abc" will fail
            isNumeric: true,          // will only allow numbers
        },
    },
},
{
    tableName:"Services",
    timestamps: false,
}
)