import { Cabins } from "./Cabin_Model.js";
import { CabinsComforts } from "./Cabins_Comforts.js";
import { Comforts } from "./Comfort_Model.js";
import { Roles } from "./Roles_Model.js";
import { Permissions } from "./Permissions_Model.js";
import { PermissionRoles } from "./Permission_Roles.js";
import { Reservations } from "./Reservations_Model.js";
import { Companions } from "./Companions_Model.js";
import { ReservationsCompanions } from "./Reservations_Companions_Models.js";
import { Payments } from "./Payments_Model.js";
import { PaymentsReservations } from "./Payments_Reservations_model.js";

export const setupAssociations = () => {
  Cabins.belongsToMany(Comforts, {
    through: CabinsComforts, // Tabla intermedia
    foreignKey: "idCabin", // Clave foránea en Cabins_Comforts
    otherKey: "idComfort", // Clave foránea en Cabins_Comforts
    as: "Comforts", // Alias para la asociación
  });

  Comforts.belongsToMany(Cabins, {
    through: CabinsComforts, // Tabla intermedia
    foreignKey: "idComfort", // Clave foránea en Cabins_Comforts
    otherKey: "idCabin", // Clave foránea en Cabins_Comforts
    as: "Cabins", // Alias para la asociación
  });


  // Asociaciones para Roles y Permissions (relación muchos a muchos)
  Roles.belongsToMany(Permissions, {
    through: PermissionRoles,
    foreignKey: "idRol", // Clave foránea en Roles_Permissions
    otherKey: "idPermission", // Clave foránea en Roles_Permissions
    as: "permissions", // Alias para la asociación
  });

  Permissions.belongsToMany(Roles, {
    through: PermissionRoles,
    foreignKey: "idPermission", // Clave foránea en Roles_Permissions
    otherKey: "idRol", // Clave foránea en Roles_Permissions
    as: "roles", // Alias para la asociación
  });


  //Asociaciones para resevas y acompañantes 
  Companions.belongsToMany(Reservations, {
    through: ReservationsCompanions,
    foreignKey: 'idCompanions',
    otherKey: 'idReservation',
    as: 'reservations'
  });
  Reservations.belongsToMany(Companions, {
    through: ReservationsCompanions,
    foreignKey: 'idReservation',
    otherKey: 'idCompanions',
    as: 'companions'
  });

  //Asociacion de pagos y reservas
  Payments.belongsToMany(Reservations, {
    through: PaymentsReservations,
    foreignKey: "idPayments",
    otherKey: "idReservation",
    as: "reservations",
  });

  Reservations.belongsToMany(Payments, {
    through: PaymentsReservations,
    foreignKey: "idReservation",
    otherKey: "idPayments",
    as: "payments",
  });


  console.log("Asociaciones configuradas correctamente.");
};