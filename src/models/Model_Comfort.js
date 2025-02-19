import { DataTypes } from "sequelize";
import { database } from "../config/database.js";

export const Comforts = database.define(
  "Comforts",
  {
    Id_Comfort: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Code: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: "El código no puede estar vacío.",
        },
        len: {
          args: [1, 50],
          msg: "El código debe tener entre 1 y 50 caracteres.",
        },
        isAlphanumeric: {
          msg: "El código solo puede contener letras y números.",
        },
      },
    },
    Name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: "El nombre no puede estar vacío.",
        },
        len: {
          args: [1, 50],
          msg: "El nombre debe tener entre 1 y 50 caracteres.",
        },
      },
    },
    Observation: {
      type: DataTypes.STRING(250),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "La observación no puede estar vacía.",
        },
        len: {
          args: [1, 250],
          msg: "La observación debe tener entre 1 y 250 caracteres.",
        },
      },
    },
    Date_entry: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: {
          msg: "La fecha de ingreso debe ser una fecha válida.",
        },
        notFutureDate(value) {
          if (new Date(value) > new Date()) {
            throw new Error("La fecha de ingreso no puede ser en el futuro.");
          }
        },
      },
    },
    Statuss: {
      type: DataTypes.ENUM("Disponible", "No Disponible", "Mantenimiento"),
      allowNull: false,
      validate: {
        isIn: {
          args: [["Disponible", "No Disponible", "Mantenimiento"]],
          msg: "El estado debe ser 'Disponible', 'No Disponible' o 'Mantenimiento'.",
        },
      },
    },
  },
  {
    tableName: "Comforts",
    timestamps: false,
  }
);
