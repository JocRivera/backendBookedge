// CabinImage_Model.js
import { DataTypes } from "sequelize";
import { database } from "../config/database.js";
import { Cabins } from "./cabin_Model.js";

export const CabinImages = database.define(
  "CabinImages",
  {
    idCabinImage: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idCabin: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Cabins,
        key: 'idCabin'
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
    tableName: "CabinImages",
    timestamps: false,
  }
);

// Establecer la relación
Cabins.hasMany(CabinImages, { foreignKey: 'idCabin', as: 'images' });
CabinImages.belongsTo(Cabins, { foreignKey: 'idCabin' });