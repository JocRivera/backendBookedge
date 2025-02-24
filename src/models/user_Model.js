import { DataTypes } from "sequelize";
import { database } from "../config/database.js";

export const Users = database.define("Users", {
  Id_User: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Id_Rol: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      len: {
        args: [1, 50],
        msg: "El nombre debe tener entre 1 y 50 caracteres.",
      },
    },
  },
  Email: {
    type: DataTypes.STRING(80),
    allowNull: false,
    unique: true,
    validate: {
      len: {
        args: [1, 80],
        msg: "El correo debe tener entre 1 y 80 caracteres.",
      },
      is: {
        args: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        msg: "El correo no es valido",
      },
    },
  },
  Phone: {
    type: DataTypes.STRING(20),
    allowNull: false,
    validate: {
      len: {
        args: [1, 20],
        msg: "El teléfono debe tener entre 1 y 20 caracteres.",
      },
    },
  },
  Document: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
    validate: {
      len: {
        args: [1, 50],
        msg: "El documento debe tener entre 1 y 50 caracteres.",
      },
    },
  },
  Password: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      len: {
        args: [8, 255],
        msg: "La contraseña debe tener al menos 8 caracteres.",
      },
      is: {
        args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/,
        msg: "La contraseña debe contener al menos una letra minúscula, una mayúscula, un número y un carácter especial.",
      },
    },
  },
  PasswordConfirmation: {
    type: DataTypes.VIRTUAL,
    allowNull: false,
    validate: {
      isMatch(value) {
        if (value !== this.Password) {
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
