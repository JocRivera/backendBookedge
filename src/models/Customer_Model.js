// import { DataTypes } from 'sequelize';
// import {database} from '../config/database.js';

// export const Customers = database.define('Customers', {
//     idCustomer: {
//         type: DataTypes.INTEGER(),
//         primaryKey: true,
//         autoIncrement: true,
//     },
//     name: {
//         type: DataTypes.STRING(50),
//         allowNull: false,
//     },
//     eps: {
//         type: DataTypes.STRING(50),
//         allowNull: false,
//     },
//     identificationType: {
//         type: DataTypes.ENUM('CC', 'CE'),
//         allowNull: false,
//     },
//     identification: {
//         type: DataTypes.STRING(50),
//         allowNull: false,
//         unique: true,
//     },
//     email: {
//         type: DataTypes.STRING(100),
//         allowNull: false,
//         unique: true,
//     },
//     cellphone: {
//         type: DataTypes.STRING(50),
//         allowNull: false,
//     },
//     address: {
//         type: DataTypes.STRING(100),
//         allowNull: false,
//     },
//     password: {
//         type: DataTypes.STRING(150),
//         allowNull: false,
//     },
//     status: {
//         type: DataTypes.BOOLEAN(),
//         allowNull: false,
//         defaultValue: true
//     }
// }, {
//     tableName: 'Customers', 
//     timestamps: false,
//     }
// );
