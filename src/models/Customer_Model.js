import { DataTypes } from 'sequelize';
import {database} from '../config/Database.js';

export const Customers = database.define('Customers', {
    Id_Customer: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
    },
    Last_Name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    Email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
    },
    Password: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    Birth_Date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    Status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
}, {
    tableName: 'Customers', 
    timestamps: false,
    }
);
