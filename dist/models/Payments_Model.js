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
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isFloat: { min: 0 }, 
      },
    },
    status: {
      type: DataTypes.ENUM("Confirmado", "Pendiente", "Anulado"),
      defaultValue: "Pendiente",
      allowNull: false,
    },
    confirmationDate: {
      type: DataTypes.DATEONLY,
      allowNull: true, 
    },
    voucher: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    voucherType: {
      type: DataTypes.STRING(50),
      allowNull: true,
    }
  },
  {
    tableName: "Payments",
    timestamps: false, 
  }
);


