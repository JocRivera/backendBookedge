import { Privileges } from '../src/models/Privileges_Model.js';
import { Permissions } from '../src/models/Permissions_Model.js';
import { Roles } from '../src/models/Roles_Model.js';
import { PermissionRoles } from '../src/models/Permission_Roles.js';

export async function initSettings() {
  try {
    // Privilegios
    const privilegeNames = ['post', 'read', 'put', 'delete', 'changeStatus'];
    const privilegeRecords = [];

    for (const name of privilegeNames) {
      const [privilege] = await Privileges.findOrCreate({
        where: { name },
        defaults: { name, status: true }
      });
      privilegeRecords.push(privilege);
    }

    // Permisos
    const moduleNames = ['servicios', 'clientes', 'usuarios', 'reservas', 'pagos', 'alojamientos', 'comodidades', 'planes'];
    const permissionRecords = [];

    for (const name of moduleNames) {
      const [permission] = await Permissions.findOrCreate({
        where: { name },
        defaults: { name, status: true }
      });
      permissionRecords.push(permission);
    }

    // Roles
    const [adminRole] = await Roles.findOrCreate({
      where: { name: 'admin' },
      defaults: { name: 'admin', status: true }
    });

    const [clientRole] = await Roles.findOrCreate({
      where: { name: 'Cliente' },
      defaults: { name: 'Cliente', status: true }
    });

    // Crea todas las relaciones de privilegios para el rol 'admin' de una vez
    const permissionRoles = [];
    for (const permission of permissionRecords) {
      for (const privilege of privilegeRecords) {
        permissionRoles.push({
          idRol: adminRole.idRol || adminRole.id, // Ajuste según tu modelo
          idPermission: permission.idPermission || permission.id, // Usar el nombre de columna correcto
          idPrivilege: privilege.idPrivilege || privilege.id // Usar el nombre de columna correcto
        });
      }
    }

    await PermissionRoles.bulkCreate(permissionRoles);

    // Definir las relaciones del cliente (parece que falta esta constante en tu código original)
    const clientRelations = [
      { module: 'reservas', privileges: ['read', 'post'] },
      { module: 'pagos', privileges: ['read'] },
      { module: 'alojamientos', privileges: ['read'] }
      // Añade más relaciones según sea necesario
    ];

    // Lo mismo para el rol 'Cliente', de acuerdo a las relaciones definidas
    const clientPermissionRoles = [];
    for (const relation of clientRelations) {
      const permission = permissionRecords.find(p => p.name === relation.module);
      if (permission) {

        for (const privName of relation.privileges) {
          const privilege = privilegeRecords.find(p => p.name === privName);
          if (privilege) {

            clientPermissionRoles.push({
              idRol: clientRole.idRol || clientRole.id, // Ajuste según tu modelo
              idPermission: permission.idPermission || permission.id, // Usar el nombre de columna correcto
              idPrivilege: privilege.idPrivilege || privilege.id // Usar el nombre de columna correcto
            });
          } else {
            console.log(`Privilege ${privName} no encontrado`);
          }
        }
      } else {
        console.log(`Permission ${relation.module} no encontrado`);
      }
    }

    if (clientPermissionRoles.length > 0) {
      await PermissionRoles.bulkCreate(clientPermissionRoles);
    }

  } catch (err) {
    console.error("❌ Error al ejecutar el seeder:", err);
    // Mostrar detalles más específicos del error
    if (err.parent) {
      console.error("Detalles SQL:", {
        message: err.parent.sqlMessage,
        code: err.parent.code,
        sql: err.parent.sql
      });
    }
  }
}