import { DataTypes } from "sequelize";
import { database } from "../config/database.js";

export const Bedrooms = database.define(
  "Bedrooms",
  {
    Id_Room: {
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
        len: {
          args: [1, 50],
          msg: "El nombre debe tener entre 1 y 50 caracteres.",
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
        len: {
          args: [1, 250],
          msg: "La descripción debe tener entre 1 y 250 caracteres.",
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
          args: 1,
          msg: "La capacidad debe ser mayor a 0",
        },
        max: {
          args: 3,
          msg: "La capacidad debe ser menor a 3",
        },
      },
    },
    Statuss: {
      type: DataTypes.ENUM("En Servicio", "Fuera de Servicio", "Mantenimiento"),
      defaultValue: "En Servicio",
      allowNull: false,
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
      validate: {
        notEmpty: {
          msg: "La imagen no puede estar vacía.",
        },
      },
    },
  },
  {
    tableName: "Bedrooms",
    timestamps: false,
  }
);