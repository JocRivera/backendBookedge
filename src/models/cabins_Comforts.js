import { DataTypes } from "sequelize";
import { database } from "../config/database.js";

export const Cabins_Comforts = database.define(
  "Cabins_Comforts",
  {
    Id_Cabin_Comfort: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Id_Cabin: {
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
      validate: { 
        notEmpty: { msg: "La fecha de entrada no puede estar vacía." },
        isDate: { msg: "La fecha de entrada debe ser una fecha válida. (YYYY-MM-DD)" },
      },
    },
    Status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      validate: { notNull: { msg: "El estado no puede ser nulo." } },
    },
  },
  {
    tableName: "Cabins_Comforts",
    timestamps: false,
  }
);
