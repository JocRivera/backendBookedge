import { DataTypes } from "sequelize";
import { database } from '../config/database.js';

export const Permissions = database.define('Permissions',
    {
        idPermission: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    },
    {
        tableName: 'permissions'
    }
)