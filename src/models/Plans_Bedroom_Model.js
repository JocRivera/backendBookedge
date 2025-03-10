import { DataTypes } from 'sequelize';
import {database} from '../config/database.js';
import { Bedrooms } from './bedrooms_Model.js';
import { Plans } from './Plans_Model.js';

export const PlanBedroomModel = database.define('PlanBedroom', {
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
    idBedroom: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Bedrooms',
            key: 'idRoom'
        }
    }
}, {
    tableName: 'PlanBedroom',
    timestamps: false,
});

// Establecer relación muchos a muchos
Plans.belongsToMany(Bedrooms, { through: PlanBedroomModel, foreignKey: 'idPlan' });
Bedrooms.belongsToMany(Plans, { through: PlanBedroomModel, foreignKey: 'idService' });