import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Bedrooms_Comforts = sequelize.define('Bedrooms_Comforts', {
  Id_Room_Comforts: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Id_Room: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Id_Comfort: {
    type: DataTypes.INTEGER,
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
  tableName: 'Bedrooms_Comforts', 
  timestamps: false,
});

