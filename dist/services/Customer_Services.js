// //Contiene la lógica de negocio. Usa los repositories para acceder a los datos. Actúan como intermediarios entre los controladores y los repositorios.

// import { CustomerRepository } from "../repositories/Customer_Repository.js";

// export class CustomerService {
//     constructor() {
//         this.customerRepository = new CustomerRepository();
//     }
//     async createCustomer(data) {
//         //VALIDACIÓN DE NEGOCIO AQUÍ
//         const existingCustomer = await this.customerRepository.getCustomerByIdentification(data.identification);
//         if (existingCustomer) {
//             throw new Error("Ya existe un cliente registrado con esa identificación");
//         }

//         const existingEmail = await this.customerRepository.getCustomerByEmail(data.email);
//         if (existingEmail) {
//             throw new Error("Ya existe un cliente registrado con ese correo electrónico");
//         }

//         return this.customerRepository.createCustomer(data);
//     }

//     async getAllCustomers() {

//         const customers = await this.customerRepository.getAllCustomers();
//         if (customers.length === 0) {
//             throw new Error("No hay clientes registrados");
//         }

//         return customers;
//     }

//     async getCustomerById(id) {

//         const customer = await this.customerRepository.getCustomerById(id);
//         if (!customer) {
//             throw new Error("El cliente no existe. El (id) debe ser entero");
//         }

//         return customer;
//     }

//     async updateCustomer(id, data) {
//         //VALIDACIÓN DE NEGOCIO AQUÍ
//         const existingCustomer = await this.customerRepository.getCustomerByIdentification(data.identification);
//         if (existingCustomer && existingCustomer.idCustomer != id) {
//             throw new Error("Ya existe un cliente registrado con esa identificación");
//         }

//         const existingEmail = await this.customerRepository.getCustomerByEmail(data.email);
//         if (existingEmail && existingEmail.idCustomer != id) {
//             throw new Error("Ya existe un cliente registrado con ese correo electrónico");
//         }

//         const customer = await this.customerRepository.getCustomerById(id);
//         if (!customer) {
//             throw new Error("No existe un cliente con ese id. El (id) debe ser entero");
//         }

//         return this.customerRepository.updateCustomer(id, data);
//     }

//     async deleteCustomer(id) {

//         const customer = await this.customerRepository.getCustomerById(id);
//         if (!customer) {
//             throw new Error("El cliente no existe. El (id) debe ser entero");
//         }

//         return this.customerRepository.deleteCustomer(id);
//     }
// }