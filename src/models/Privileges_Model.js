import { DataTypes } from "sequelize";
import { database } from "../config/database.js";

export const Privileges = database.define("Privileges", {
    idPrivilege: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.ENUM('post', 'read', 'put', 'delete','changeStatus'),
        allowNull: false,
        unique: true
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
},
    {
        tableName: "privileges"
    }
);