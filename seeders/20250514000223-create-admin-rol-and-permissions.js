'use strict';

const { Privileges } = require('../src/models/Privileges_Model');
const { Permissions } = require('../src/models/Permissions_Model');
const { Roles } = require('../src/models/Roles_Model');
const { PermissionRoles } = require('../src/models/Permission_Roles');

module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Crear Privilegios
    const privilegeNames = ['create', 'read', 'update', 'delete', 'changeStatus'];
    const privilegeRecords = [];

    for (const name of privilegeNames) {
      const [privilege] = await Privileges.findOrCreate({
        where: { name },
        defaults: { name, status: true }
      });
      privilegeRecords.push(privilege);
    }

    // 2. Crear Permisos (módulos)
    const moduleNames = ['servicios', 'clientes', 'usuarios', 'reservas', 'pagos', 'alojamientos', 'comodidades', 'planes'];
    const permissionRecords = [];

    for (const name of moduleNames) {
      const [permission] = await Permissions.findOrCreate({
        where: { name },
        defaults: { name, status: true }
      });
      permissionRecords.push(permission);
    }

    // 3. Crear Rol Admin
    const [adminRole] = await Roles.findOrCreate({
      where: { name: 'admin' },
      defaults: { name: 'admin', status: true }
    });
    //Crear Rol Cliente
    const [clientRole] = await Roles.findOrCreate({
      where: { name: 'Cliente' },
      defaults: { name: 'Cliente', status: true }
    });

    // 4. Relacionar: Asignar todos los privilegios de todos los permisos al rol admin
    for (const permission of permissionRecords) {
      for (const privilege of privilegeRecords) {
        await PermissionRoles.findOrCreate({
          where: {
            idRol: adminRole.id,
            idPermission: permission.id,
            idPrivilege: privilege.id
          },
          defaults: {
            idRol: adminRole.id,
            idPermission: permission.id,
            idPrivilege: privilege.id
          }
        });
      }
    }
    const getPrivilege = (name) => privilegeRecords.find(p => p.name === name);
    const getPermission = (name) => permissionRecords.find(p => p.name === name);

    const clientRelations = [
      { module: 'reservas', privileges: ['read', 'create', 'update'] },
      { module: 'servicios', privileges: ['read'] },
      { module: 'planes', privileges: ['read'] },
      { module: 'alojamientos', privileges: ['read'] }
    ];

    for (const relation of clientRelations) {
      const permission = getPermission(relation.module);
      for (const privName of relation.privileges) {
        const privilege = getPrivilege(privName);
        if (permission && privilege) {
          await PermissionRoles.findOrCreate({
            where: {
              idRol: clientRole.id,
              idPermission: permission.id,
              idPrivilege: privilege.id
            },
            defaults: {
              idRol: clientRole.id,
              idPermission: permission.id,
              idPrivilege: privilege.id
            }
          });
        }
      }
    }

    console.log("Seeder ejecutado correctamente: Rol admin & Cliente con todos los permisos y privilegios.");
  },

  async down(queryInterface, Sequelize) {
    // Eliminar relaciones primero
    const adminRole = await Roles.findOne({ where: { name: 'admin' } });
    const clientRole = await Roles.findOne({ where: { name: 'Cliente' } });
    if (adminRole) {
      await PermissionRoles.destroy({ where: { idRol: adminRole.id } });
      await Roles.destroy({ where: { id: adminRole.id } });
    }
    if (clientRole) {
      await PermissionRoles.destroy({ where: { idRol: clientRole.id } });
      await Roles.destroy({ where: { id: clientRole.id } });
    }
    await Permissions.destroy({
      where: {
        name: ['servicios', 'clientes', 'usuarios', 'reservas']
      }
    });

    await Privileges.destroy({
      where: {
        name: ['create', 'read', 'update', 'delete', 'changeStatus']
      }
    });

    console.log("Seeder revertido correctamente.");
  }
};
