import { DataTypes } from "sequelize";
import { database } from "../config/database.js";



export const Payments = database.define(
  "Payments",
  {
    idPayments: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    paymentMethod: {
      type: DataTypes.STRING(25),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    paymentDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isFloat: { min: 0 }, 
      },
    },
    status: {
      type: DataTypes.ENUM("Confirmado", "Pendiente"),
      defaultValue: "Pendiente",
      allowNull: false,
    },
    confirmationDate: {
      type: DataTypes.DATEONLY,
      allowNull: true, 
    },
  },
  {
    tableName: "Payments",
    timestamps: false, 
  }
);


