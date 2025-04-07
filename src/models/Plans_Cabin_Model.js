import { DataTypes } from 'sequelize';
import { database } from '../config/database.js';
// import { Cabins } from './cabin_Model.js';
// import { Plans } from './Plans_Model.js';

export const PlanCabinModel = database.define('PlanCabin', {
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
        // idCabin: {
        //     type: DataTypes.INTEGER,
        //     references: {
        //         model: 'Cabins',
        //         key: 'idCabin'
        //     }
        // },
        capacity: {
            type: DataTypes.INTEGER,
        },
        quantity: {
            type: DataTypes.INTEGER,
        },
    }, {
    tableName: 'PlanCabin',
    timestamps: false,
});

// Establecer relación muchos a muchos
// Plans.belongsToMany(Cabins, { through: PlanCabinModel, foreignKey: 'idPlan' });
// Cabins.belongsToMany(Plans, { through: PlanCabinModel, foreignKey: 'idCabin' });