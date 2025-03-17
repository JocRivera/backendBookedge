import { DataTypes } from 'sequelize';
import {database} from '../config/database.js';


export const Plans = database.define('Plans', {
    idPlan: {
        type: DataTypes.INTEGER(),
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING(250),
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING(250),
        allowNull: false,
    },
    total: {
        type: DataTypes.FLOAT,
    },
    salePrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
    }
}, {
    tableName: 'Plans',
    timestamps: false,
    }
);
