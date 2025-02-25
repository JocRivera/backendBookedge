import { DataTypes } from "sequelize";
import { database } from "../config/Database.js";

export const Users = database.define("Users", {
  idUser: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  idRol: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(80),
    allowNull: false,
    unique: true,
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  document: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  passwordConfirmation: {
    type: DataTypes.VIRTUAL,
    allowNull: false,
    validate: {
      isMatch(value) {
        if (value !== this.password) {
          throw new Error("Las contraseñas no coinciden.");
        }
      },
      State: {
        type: DataTypes.ENUM("activo", "inactivo"),
        defaultValue: "active",
        allowNull: false,
      },
    },
  },
});
