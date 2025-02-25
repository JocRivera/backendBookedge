import { DataTypes, Sequelize } from "sequelize"; 
import { sequelize } from '../config/Database.js';
export const companions = sequelize.define('companions', {
    idCompanions: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    birthdate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    documentType: {
        type: DataTypes.ENUM("Cédula de ciudadanía", "Cédula de extranjería", "Pasaporte", "Tarjeta de identidad"),
        defaultValue: "Cédula de ciudadanía",
        validate: {
            isIn: [["Cédula de ciudadanía", "Cédula de extranjería", "Pasaporte"]],
        }
    },
    documentNumber: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

export default companions;