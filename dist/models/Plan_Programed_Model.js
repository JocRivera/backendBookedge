import { DataTypes } from 'sequelize';
import {database} from '../config/database.js';
import { Plans } from './Plans_Model.js';

export const PlansProgramed = database.define('PlansProgramed', {
    idPlanProgramed: {
        type: DataTypes.INTEGER(),
        primaryKey: true,
        autoIncrement: true,
    },
    idPlan: {
        type: DataTypes.INTEGER(),
        allowNull: false,
    },
    startDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    endDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    statusProgramed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    tableName: 'PlansProgramed',
    timestamps: false,
    }
);

PlansProgramed.belongsTo(Plans, { foreignKey: 'idPlan' });
Plans.hasMany(PlansProgramed, { foreignKey: 'idPlan' });