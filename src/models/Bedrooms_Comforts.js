import { DataTypes } from "sequelize";
import { database } from "../config/Database.js";

export const Bedrooms_Comforts = database.define(
  "Bedrooms_Comforts",
  {
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
      valide: {
        notEmpty: {
          msg: "La fecha de entrada no puede estar vacía.",
        },
        isDate: {
          msg: "La fecha de entrada debe ser una fecha válida. (YYYY-MM-DD)",
        },
      },
    },
    Statuss: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      valide: {
        notNull: {
          msg: "El estado no puede ser nulo.",
        },
      },
    },
  },
  {
    tableName: "Bedrooms_Comforts",
    timestamps: false,
  }
);
