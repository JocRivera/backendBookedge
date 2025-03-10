import { loginService,registerCustomerService } from "../services/authService.js";
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const response = await loginService(email, password);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const registerCustomer = async (req, res) => {
    try {
        const customerData = req.body;
        const response = await registerCustomerService(customerData);
        res.status(201).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const logout = async (req,res) =>{
    
}