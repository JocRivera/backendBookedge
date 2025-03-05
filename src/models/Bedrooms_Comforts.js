import { DataTypes } from "sequelize";
import { database } from "../config/database.js";

export const BedroomsComforts = database.define(
  "BedroomsComforts",
  {
    idRoomComforts: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idRoom: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idComfort: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    dateEntry: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "BedroomsComforts",
    timestamps: false,
  }
);
