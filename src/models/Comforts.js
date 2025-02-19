import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Comforts = sequelize.define("Comforts", {
  Id_Comfort: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  Observation: {
    type: DataTypes.STRING(250),
    allowNull: false,
  },
  Date_entry: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  Statuss: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  tableName: "Comforts",
  timestamps: false,
});