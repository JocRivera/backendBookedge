import bcrypt from "bcryptjs";
import { Users } from "../models/user_Model.js";
import { generateToken } from "../utils/jwt.js";
import { Roles } from "../models/Roles_Model.js";

export const loginService = async (email, password) => {
  try {
    const user = await Users.findOne({ where: { email } });
    if (!user) throw new Error("Correo o contraseña incorrectos");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Correo o contraseña incorrectos");

    const token = generateToken(user, user.idRol);
    const { password: _, ...userWithoutPassword } = user.dataValues;
    return { user: userWithoutPassword, token };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const registerCustomerService = async (userData) => {
  try {
    const { password, eps, address, email, ...rest } = userData;

    if (await Users.findOne({ where: { email } })) {
      throw new Error("El correo ya se encuentra registrado");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const clientRol = await Roles.findOne({ where: { name: "Cliente" } });
    if (!clientRol) throw new Error("El rol de cliente no existe");

    const newUser = await Users.create({
      ...rest,
      email,
      password: hashedPassword,
      eps: eps || null,
      address: address || null,
      idRol: clientRol.idRol,
    });

    const token = generateToken(newUser, clientRol.idRol);

    const { password: _, ...userWithoutPassword } = newUser.dataValues;
    return { user: userWithoutPassword, token };
  } catch (error) {
    throw new Error(error.message);
  }
};
