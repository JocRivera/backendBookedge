import { DataTypes } from "sequelize";
import { database } from "../config/database.js";

export const Comforts = database.define(
  "Comforts",
  {
    idComfort: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "Comforts",
    timestamps: false,
  }
);

