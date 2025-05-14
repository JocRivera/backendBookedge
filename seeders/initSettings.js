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
          idRol: adminRole.id,
          idPermission: permission.id,
          idPrivilege: privilege.id
        });
      }
    }
    await PermissionRoles.bulkCreate(permissionRoles);

    // Lo mismo para el rol 'Cliente', de acuerdo a las relaciones definidas
    const clientPermissionRoles = [];
    for (const relation of clientRelations) {
      const permission = permissionRecords.find(p => p.name === relation.module);
      for (const privName of relation.privileges) {
        const privilege = privilegeRecords.find(p => p.name === privName);
        if (permission && privilege) {
          clientPermissionRoles.push({
            idRol: clientRole.id,
            idPermission: permission.id,
            idPrivilege: privilege.id
          });
        }
      }
    }
    await PermissionRoles.bulkCreate(clientPermissionRoles);

    console.log("✅ Seeder ejecutado correctamente desde la app.");
  } catch (err) {
    console.error("❌ Error al ejecutar el seeder:", err);
  }
}
