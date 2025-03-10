import { DataTypes } from 'sequelize';
import {database} from '../config/database.js';
import { Services } from './Services_Model.js';

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
        allowNull: false,
    },
    salePrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    idService: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Services',
            key: 'Id_Service'
        }
    }
}, {
    tableName: 'Plans',
    timestamps: false,
    }
);
Plans.belongsTo(Services, { foreignKey: 'idService' });
Services.hasMany(Plans, { foreignKey: 'idService' });