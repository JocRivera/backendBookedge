import { DataTypes } from 'sequelize';
import { database } from '../config/Database.js';

export const Roles = database.define('roles',
    {
        idRol: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }

    }

)
