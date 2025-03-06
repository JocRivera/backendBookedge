import { DataTypes } from "sequelize";
import { database } from "../config/database.js";
export const Users = database.define(
  "Users",
  {
    idUser: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(80),
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    document: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    State: {
      type: DataTypes.ENUM("activo", "inactivo"),
      defaultValue: "activo",
      allowNull: false,
    },
  },
  {
    tableName: "Users",
    timestamps: false,
  }
);
