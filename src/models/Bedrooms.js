import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Bedrooms = sequelize.define("Bedrooms", {
  Id_Room: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  Description: {
    type: DataTypes.STRING(250),
    allowNull: false,
  },
  Capacity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 3,
    },
  },
  Statuss: {
    type: DataTypes.ENUM("En Servicio", "Fuera de Servicio", "Mantenimiento"),
    defaultValue: "En Servicio",
  },
  IMAGE: {
    type: DataTypes.STRING(250),
    allowNull: false,
  },
}, {
  tableName: "Bedrooms",
  timestamps: false,
}); 