import { DataTypes } from 'sequelize';
import { database } from '../config/database.js';

export const PermissionRoles = database.define(
    'PermissionRoles',
    {
        idPermissionRole: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idPermission: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idRole: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: 'PermissionRoles',
        timestamps: false
    }
);