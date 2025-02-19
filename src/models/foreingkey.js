import Cabins from "./cabin_Models.js";
import Comforts from "./Comforts.js";
import Bedrooms from "./Bedrooms.js";
import Cabins_Comforts from "./cabins_conforts.js";
import Bedrooms_Comforts from "./bedrooms_conforts.js";

// Relación muchos-a-muchos entre Cabins y Comforts
Cabins.belongsToMany(Comforts, {
  through: Cabins_Comforts,
  foreignKey: 'Id_Cabin',   
  otherKey: 'Id_Comfort',  
  onDelete : 'CASCADE',
  OnUpdate : 'CASCADE'
 
});

Comforts.belongsToMany(Cabins, {
  through: Cabins_Comforts,
  foreignKey: 'Id_Comfort', 
  otherKey: 'Id_Cabin',   
  onDelete : 'CASCADE',
  OnUpdate : 'CASCADE'
  
});

// Relación muchos-a-muchos entre Bedrooms y Comforts
Bedrooms.belongsToMany(Comforts, {
  through: Bedrooms_Comforts, 
  foreignKey: 'Id_Room',      
  otherKey: 'Id_Comfort',
  onDelete : 'CASCADE',
  OnUpdate : 'CASCADE'

});

Comforts.belongsToMany(Bedrooms, {
  through: Bedrooms_Comforts, // Usa el modelo intermedio
  foreignKey: 'Id_Comfort',   // Clave foránea que apunta a Comforts
  otherKey: 'Id_Room',        // Clave foránea que apunta a Bedrooms
  onDelete : 'CASCADE',
  OnUpdate : 'CASCADE'
});

