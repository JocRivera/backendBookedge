'use strict';

const { Privileges } = require('../src/models/Privileges_Model');
const { Permissions } = require('../src/models/Permissions_Model');
const { Roles } = require('../src/models/Roles_Model');
const { setupAssociations } = require('../src/models/setupAssociations');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const privileges = [
      { name: 'create', status: true },
      { name: 'read', status: true },
      { name: 'update', status: true },
      { name: 'delete', status: true },
      { name: 'changeStatus', status: true },
    ];

    for (const privilege of privileges) {
      await Privileges.findOrCreate({
        where: { name: privilege.name },
        defaults: privilege
      });
    }
    const permissionsData = [
      { name: 'dashboard', status: true },
      { name: 'usuarios', status: true },
      { name: 'clientes', status: true },
      { name: 'reservas', status: true },
      { name: 'servicios', status: true },
      { name: 'alojamientos', status: true },
      { name: 'configuracion', status: true },
      { name: 'roles', status: true },
      { name: 'permisos', status: true },
      { name: 'planes', status: true },
    ];
    for (const permission of permissionsData) {
      await Permissions.findOrCreate({
        where: { name: permission.name },
        defaults: permission
      });
    }
    const roles = [
      { name: 'admin', status: true },
      { name: 'Cliente', status: true },
    ];
    for (const role of roles) {
      await Roles.findOrCreate({
        where: { name: role.name },
        defaults: role
      });
    }
    const role = await Roles.findOne({ where: { name: 'admin' } });
    const permissions = await Permissions.findAll();
    const allPrivileges = await Privileges.findAll();
    const permissionRoles = [];
    for (const permission of permissions) {
      for (const privilege of allPrivileges) {
        permissionRoles.push({
          idRol: role.id,
          idPermission: permission.id,
          idPrivilege: privilege.id,
          status: true,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
    }
    await queryInterface.bulkInsert('PermissionRoles', permissionRoles, {});

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Privileges', {
      name: ['create', 'read', 'update', 'delete', 'changeStatus']
    }, {});

    await queryInterface.bulkDelete('Permissions', {
      name: [
        'dashboard', 'usuarios', 'clientes', 'reservas',
        'servicios', 'alojamientos', 'cofiguracion',
        'roles', 'permisos', 'planes'
      ]
    }, {});

    await queryInterface.bulkDelete('Roles', {
      name: ['admin', 'Cliente']
    }, {});
  }

};
