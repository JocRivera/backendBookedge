import { Cabins } from "./Cabin_Model.js";
import { CabinsComforts } from "./Cabins_Comforts.js";
import { Comforts } from "./Comfort_Model.js";
import { Bedrooms } from "./bedrooms_Model.js";
import { BedroomsComforts } from "./Bedrooms_Comforts.js";
import { Roles } from "./Roles_Model.js";
import { Permissions } from "./Permissions_Model.js";
import { PermissionRoles } from "./Permission_Roles.js";
import { Privileges } from "./Privileges_Model.js";
import { Reservations } from "./Reservations_Model.js";
import { Plans } from "./Plans_Model.js";
import { Companions } from "./Companions_Model.js";
import { ReservationsCompanions } from "./Reservations_Companions_Models.js";
import { Payments } from "./Payments_Model.js";
import { Users } from "../models/user_Model.js";
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

  CabinsComforts.belongsTo(Cabins, { foreignKey: "idCabin" });
  CabinsComforts.belongsTo(Comforts, { foreignKey: "idComfort" });

  Bedrooms.belongsToMany(Comforts, {
    through: BedroomsComforts,
    foreignKey: "idRoom",
    otherKey: "idComfort",
    as: "Comforts",
  });

  Comforts.belongsToMany(Bedrooms, {
    through: BedroomsComforts,
    foreignKey: "idComfort",
    otherKey: "idRoom",
    as: "Rooms",
  });
  BedroomsComforts.belongsTo(Bedrooms, { foreignKey: "idRoom" });
  BedroomsComforts.belongsTo(Comforts, { foreignKey: "idComfort" });

  // Relaciones de PermissionRoles con las otras entidades (mantener)
  PermissionRoles.belongsTo(Roles, { foreignKey: 'idRol', as: 'role' });
  PermissionRoles.belongsTo(Permissions, { foreignKey: 'idPermission', as: 'permissions' });
  PermissionRoles.belongsTo(Privileges, { foreignKey: 'idPrivilege', as: 'privileges' });
  Roles.hasMany(PermissionRoles, { foreignKey: 'idRol', as: 'permissionRoles' });
  Permissions.hasMany(PermissionRoles, { foreignKey: 'idPermission', as: 'permissionRoles' });
  Privileges.hasMany(PermissionRoles, { foreignKey: 'idPrivilege', as: 'permissionRoles' });

  //Asociaciones para resevas y acompañantes
  Companions.belongsToMany(Reservations, {
    through: ReservationsCompanions,
    foreignKey: "idCompanions",
    otherKey: "idReservation",
    as: "reservations",
  });
  Reservations.belongsToMany(Companions, {
    through: ReservationsCompanions,
    foreignKey: "idReservation",
    otherKey: "idCompanions",
    as: "companions",
  });

  //Asociacion de pagos y reservas
  // Asociaciones entre Payments, Reservations y PaymentsReservations
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

  // Asociaciones adicionales para acceder directamente a la tabla intermedia
  Payments.hasMany(PaymentsReservations, {
    foreignKey: "idPayments",
    as: "paymentRelations",
  });

  Reservations.hasMany(PaymentsReservations, {
    foreignKey: "idReservation",
    as: "paymentRelations",
  });

  PaymentsReservations.belongsTo(Payments, {
    foreignKey: "idPayments",
    as: "payment",
  });

  PaymentsReservations.belongsTo(Reservations, {
    foreignKey: "idReservation",
    as: "reservation",
  });

  Plans.hasMany(Reservations, {
    foreignKey: "idPlan",
    as: "reservations",
  });

  Reservations.belongsTo(Plans, {
    foreignKey: "idPlan",
    as: "plan",
  });

  //Relacion de reservas de uno a muchos

  Users.hasMany(Reservations, {
    foreignKey: "idUser",
    as: "reservations",
  });

  Reservations.belongsTo(Users, {
    foreignKey: "idUser",
    as: "user",
  });

  console.log("Asociaciones configuradas correctamente.");
};
