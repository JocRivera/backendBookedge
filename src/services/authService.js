import bcrypt from "bcryptjs";
import { Users } from "../models/user_Model.js";
import { Customers } from "../models/Customer_Model.js";
import { generateToken } from "../utils/jwt.js";

export const loginService = async (email, password) => {
    // Buscar en Users
    const user = await Users.findOne({ where: { email } });
    if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error("Contraseña incorrecta");
        return { token: generateToken(user, user.idRol), role: user.idRol };
    }

    // Buscar en Customers
    const customer = await Customers.findOne({ where: { email } });
    if (customer) {
        const isMatch = await bcrypt.compare(password, customer.password);
        if (!isMatch) throw new Error("Contraseña incorrecta");
        return { token: generateToken(customer, "cliente"), role: "customer" };
    }

    throw new Error("Usuario no encontrado");
};


export const registerCustomerService = async (data) => {
    const { name, eps, identificationType, identification, email, cellphone, address, password } = data;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newCustomer = await Customers.create({
        name,
        eps,
        identificationType,
        identification,
        email,
        cellphone,
        address,
        password: hashedPassword,
    });
    return { token: generateToken(newCustomer, "cliente"), customer: newCustomer };
};
