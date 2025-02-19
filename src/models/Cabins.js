import { DataTypes } from "sequelize";
import { database } from "../config/database.js"; // Sin espacios adicionales

export const Cabins = database.define(
  "Cabins",
  {
    Id_Cabin: {
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
    description: {
      type: DataTypes.STRING(250),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 4,
        max: 7,
        isInt: true,
      },
    },
    Statuss: {
      type: DataTypes.ENUM("En Servicio", "Fuera de Servicio", "Mantenimiento"),
      defaultValue: "En Servicio",
      validate: {
        isIn: [["En Servicio", "Fuera de Servicio", "Mantenimiento"]],
      },
    },
    IMAGE: {
      type: DataTypes.STRING(250),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    tableName: "Cabins",
    timestamps: false,
  }
);