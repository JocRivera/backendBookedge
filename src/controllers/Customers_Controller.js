// //Maneja las peticiones HTTP y respuestas
// // No contiene lógica de negocio, solo coordina
// // Traduce las peticiones HTTP a llamadas al service
// // Maneja los errores y envía las respuestas apropiadas

// import { CustomerService } from "../services/Customer_Services.js";
// import bcrypt from "bcryptjs";

// export class CustomersController {
//     constructor() {
//         this.customerService = new CustomerService();
//     }

//     async getAllCustomers(req, res) {
//         try {
//             const customers = await this.customerService.getAllCustomers();
//             res.status(200).json(customers);
//         } catch (error) {
//             res.status(500).json({ error: error.message });
//         }
//     }

//     async getCustomerById(req, res) {
//         try {
//             const { id } = req.params;
//             const customer = await this.customerService.getCustomerById(id);
//             res.status(200).json(customer);
//         } catch (error) {
//             res.status(500).json({ error: error.message });
//         }
//     }

//     async createCustomer(req, res) {
//         try {
//             const data = req.body;
//             const hash = bcrypt.hashSync(data.password, 10);
//             data.password = hash;
//             const newCustomer = await this.customerService.createCustomer(data);
//             res.status(201).json(newCustomer);
//         } catch (error) {
//             res.status(400).json({ error: error.message });
//         }
//     }

//     async updateCustomer(req, res) {
//         try {
//             const { id } = req.params;
//             const data = req.body;
//             const updatedCustomer = await this.customerService.updateCustomer(id, data);
//             res.status(200).json(updatedCustomer);
//         } catch (error) {
//             res.status(400).json({ error: error.message });
//         }
//     }

//     async deleteCustomer(req, res) {
//         try {
//             const { id } = req.params;
//             await this.customerService.deleteCustomer(id);
//             res.status(200).json({ message: `Cliente ${id} eliminado con éxito}` });
//         } catch (error) {
//             res.status(500).json({ error: error.message });
//         }
//     }
// }
