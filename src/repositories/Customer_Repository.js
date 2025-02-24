// Los repositorios son responsables de interactuar directamente con la base de datos.
// Aquí se colocan las consultas SQL o las operaciones de Sequelize. Permite cambiar la fuente de datos sin afectar otras capas

import {Customers}  from "../models/Customer_Model.js";

export class CustomerRepository{
    async getAllCustomers() {
        return await Customers.findAll();
    }
    
    async getCustomerById(id) {
        return await Customers.findByPk(id);
    }

    async createCustomer(data) {
        return await Customers.create(data);
    }

    async updateCustomer(id, data) {
        return await Customers.update(data, { where: { id_customer: id } });
    }

    async deleteCustomer(id) {
        return await Customers.destroy({ where: { id_customer: id } });
    }
}