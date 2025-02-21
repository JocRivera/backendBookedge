import { Bedrooms } from "./bedrooms_Model.js";
import { Bedrooms_Comforts } from "./Bedrooms_Comforts.js";
import { Cabins } from "./cabin_Model.js";
import { Cabins_Comforts } from "./cabins_Comforts.js";
import { Comforts } from "./comfort_Model.js";

export const setupAssociations = () => {
  // Asociaciones para Cabins y Comforts (relación muchos a muchos)
  Cabins.belongsToMany(Comforts, {
    through: Cabins_Comforts, // Tabla intermedia
    foreignKey: "Id_Cabin", // Clave foránea en Cabins_Comforts
    otherKey: "Id_Comfort", // Clave foránea en Cabins_Comforts
    as: "Comforts", // Alias para la asociación
  });

  Comforts.belongsToMany(Cabins, {
    through: Cabins_Comforts, // Tabla intermedia
    foreignKey: "Id_Comfort", // Clave foránea en Cabins_Comforts
    otherKey: "Id_Cabin", // Clave foránea en Cabins_Comforts
    as: "Cabins", // Alias para la asociación
  });

  // Asociaciones para Bedrooms y Comforts (relación muchos a muchos)
  Bedrooms.belongsToMany(Comforts, {
    through: Bedrooms_Comforts, // Tabla intermedia
    foreignKey: "Id_Room", // Clave foránea en Bedrooms_Comforts
    otherKey: "Id_Comfort", // Clave foránea en Bedrooms_Comforts
    as: "Comforts", // Alias para la asociación
  });

  Comforts.belongsToMany(Bedrooms, {
    through: Bedrooms_Comforts, // Tabla intermedia
    foreignKey: "Id_Comfort", // Clave foránea en Bedrooms_Comforts
    otherKey: "Id_Room", // Clave foránea en Bedrooms_Comforts
    as: "Bedrooms", // Alias para la asociación
  });

  console.log("Asociaciones configuradas correctamente.");
};