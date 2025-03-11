import { DataTypes} from "sequelize"; 
import { database } from '../config/database.js';

export const Companions = database.define('Companions', {
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
            isIn: [["Cédula de ciudadanía", "Cédula de extranjería", "Pasaporte", "Tarjeta de identidad"]],
        }
    },
    documentNumber: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    tableName:"Companions",
    timestamps: false,

});


