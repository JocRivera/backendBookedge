// El método .bind() en JavaScript se usa para enlazar una función a un contexto específico de this.
// En términos simples, garantiza que this dentro de una función siempre haga referencia al objeto correcto, incluso si la función se pasa como callback o se usa en un evento.

import express from "express";

import { CustomersController } from "../controllers/Customers_Controller.js";
import { validateCustomer } from "../middlewares/Validate_Customer.js";

const router = express.Router();
const customersController = new CustomersController();

router.get("/", customersController.getAllCustomers.bind(customersController));
router.get("/:id", customersController.getCustomerById.bind(customersController));
router.post("/", validateCustomer, customersController.createCustomer.bind(customersController));
router.put("/:id", validateCustomer, customersController.updateCustomer.bind(customersController));
router.delete("/:id", customersController.deleteCustomer.bind(customersController));

export default router;