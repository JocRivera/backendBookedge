import { DataTypes } from "sequelize";
import { database } from "../config/database.js";
import { Roles } from "./Roles_Model.js";

export const Users = database.define(
  "Users",
  {
    idUser: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idRol: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Roles, key: "idRol" },
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    eps: {
      type: DataTypes.STRING(50),
      allowNull: true, 
    },
    identificationType: {
      type: DataTypes.ENUM("CC", "CE"),
      allowNull: false,
    },
    identification: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    cellphone: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(100),
      allowNull: true, 
    },
    password: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    tableName: "Users",
    timestamps: false,
  }
);

// Relaciones con Roles
Users.belongsTo(Roles, { foreignKey: "idRol", as: "roles" });
Roles.hasMany(Users, { foreignKey: "idRol", as: "roles" });
