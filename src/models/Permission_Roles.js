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
        idRol: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: 'permissionroles',
        timestamps: false
    }
);