import { DataTypes } from "sequelize";
import { database } from "../config/database.js";

export const PermissionPrivileges = database.define("PermissionPrivileges", {
    idPermissionPrivilege: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idPermission: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idPrivilege: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: "permissionprivileges",
    timestamps: false
});