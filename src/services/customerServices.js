//Contiene la lógica de negocio. Usa los repositories para acceder a los datos. Actúan como intermediarios entre los controladores y los repositorios.

import { CustomerRepository } from "../repositories/Customer_Repository.js";

export class CustomerService {
    constructor() {
        this.customerRepository = new CustomerRepository();
    }
    async createCustomer(data) {
        //VALIDACIÓN DE NEGOCIO AQUÍ	
        return this.customerRepository.createCustomer(data);
    }

    async getAllCustomers() {
        return this.customerRepository.getAllCustomers();
    }

    async getCustomerById(id) {
        return this.customerRepository.getCustomerById(id);
    }

    async updateCustomer(id, data) {
        return this.customerRepository.updateCustomer(id, data);
    }

    async deleteCustomer(id) {
        return this.customerRepository.deleteCustomer(id);
    }
}