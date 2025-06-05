import { DataTypes } from 'sequelize';
import {database} from '../config/database.js';
import { Services } from './Services_Model.js';
import { Plans } from './Plans_Model.js';

export const PlanServicesModel = database.define('PlanServices', {
    idPlanService: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    idPlan: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Plans',
            key: 'idPlan'
        }
    },
    idService: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Services',
            key: 'Id_Service'
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'PlanServices',
    timestamps: false,
});

// Establecer relación muchos a muchos
Plans.belongsToMany(Services, { through: PlanServicesModel, foreignKey: 'idPlan' });
Services.belongsToMany(Plans, { through: PlanServicesModel, foreignKey: 'idService' });