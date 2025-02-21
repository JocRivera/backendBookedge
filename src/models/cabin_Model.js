import { DataTypes } from "sequelize";
import { database } from "../config/database.js"; 

export const Cabins = database.define(
  "Cabins",
  {
    Id_Cabin: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: "El nombre no puede estar vacío.",
        },
      },
    },
    Description: {
      type: DataTypes.STRING(250),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "La descripción no puede estar vacía.",
        },
      },
    },
    Capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          msg: "La capacidad debe ser un número entero.",
        },
        min: {
          args: 4,
          msg: "La capacidad mínima es 4.",
        },
        max: {
          args: 7,
          msg: "La capacidad máxima es 7.",
        },
      },
    },
    Statuss: {
      type: DataTypes.ENUM("En Servicio", "Fuera de Servicio", "Mantenimiento"),
      defaultValue: "En Servicio",
      validate: {
        isIn: {
          args: [["En Servicio", "Fuera de Servicio", "Mantenimiento"]],
          msg: "El estado debe ser 'En Servicio', 'Fuera de Servicio' o 'Mantenimiento'.",
        },
      },
    },
    Imagen: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
  },
  {
    tableName: "Cabins",
    timestamps: false,
  }
);