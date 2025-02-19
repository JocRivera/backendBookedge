import { DataTypes } from 'sequelize';
import  {database} from '../config/database.js'; 

 export const Cabins_Comforts = database.define('Cabins_Comforts', {
  Id_Cabin_Comfort: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Id_Cabin: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Id_Comfort: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Date_entry: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  Status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  tableName: 'Cabins_Comforts', 
  timestamps: false, 
});

