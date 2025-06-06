import { DataTypes } from "sequelize";
import { database } from "../config/database.js";
import { Cabins } from "./cabin_Model.js";
import { Comforts } from "./comfort_Model.js";


export const CabinsComforts = database.define(
  "CabinsComforts",
  {
    idCabinComfort: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idCabin: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idComfort: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "CabinsComforts",
    timestamps: false,
  }
);
