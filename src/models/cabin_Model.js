import { DataTypes } from "sequelize";
import { CabinsComforts } from "./Cabins_Comforts.js";
import { database } from "../config/database.js";

export const Cabins = database.define(
  "Cabins",
  {
    idCabin: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      allowNull:false,
      type: DataTypes.ENUM("En Servicio", "Fuera de Servicio", "Mantenimiento"),
      defaultValue: "En Servicio",
    },
   
  },
  {
    tableName: "Cabins",
    timestamps: false,
  }
);
