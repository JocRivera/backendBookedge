import { DataTypes } from "sequelize";
import { database } from "../config/database.js";
import { Bedrooms } from "./Bedrooms_Model.js";

export const RoomImages = database.define(
  "RoomImages",
  {
    idRoomImage: {
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
    imagePath: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    isPrimary: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  {
    tableName: "RoomImages",
    timestamps: false,
  }
);

Bedrooms.hasMany(RoomImages, { foreignKey: 'idRoom', as: 'images' });
RoomImages.belongsTo(Bedrooms, { foreignKey: 'idRoom' });
