import { DataTypes } from "sequelize";
import { database } from "../config/database.js";
import { Bedrooms } from "./bedrooms_Model.js";
import { Comforts } from "./comfort_Model.js";

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
      references: {
        model: Bedrooms,
        key: 'idRoom'
      }
    },
    idComfort: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Comforts,
        key: 'idComfort'
      }
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    dateEntry: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  },
  {
    tableName: "BedroomsComforts",
    timestamps: false,
  }
);