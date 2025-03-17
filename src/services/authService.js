import bcrypt from "bcryptjs";
import { Users } from "../models/user_Model.js";
import { generateToken, generateRefreshToken } from "../utils/jwt.js";
import { Roles } from "../models/Roles_Model.js";

export const loginService = async (email, password) => {
  try {
    const user = await Users.findOne({ where: { email } });
    if (!user || !user.status)
      throw new Error("Correo o contraseña incorrectos");

    if (!(await bcrypt.compare(password, user.password))) {
      throw new Error("Correo o contraseña incorrectos");
    }

    const token = generateToken(user);
    const refreshToken = generateRefreshToken(user);

    if (user.refreshToken !== refreshToken) {
      await user.update({ refreshToken });
    }

    return {
      user: { idUser: user.idUser, email: user.email, idRol: user.idRol },
      token, 
    };
  } catch (error) {
    throw new Error(error.message || "Error en el inicio de sesión");
  }
};

export const refreshAccessToken = async (refreshToken) => {
  if (!refreshToken) throw new Error("No hay refresh token");

  const user = await Users.findOne({ where: { refreshToken } });
  if (!user) throw new Error("Refresh token inválido");

  return { token: generateToken(user) };
};

export const logoutService = async (userId) => {
  const user = await Users.findByPk(userId);
  if (user && user.refreshToken) {
    await user.update({ refreshToken: null });
  }
};

export const registerCustomerService = async (userData) => {
  try {
    const { password, email, ...rest } = userData;

    if (await Users.findOne({ where: { email } })) {
      throw new Error("El correo ya está registrado");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const clientRol = await Roles.findOne({ where: { name: "Cliente" } });
    if (!clientRol) throw new Error("El rol de cliente no existe");

    const newUser = await Users.create({
      ...rest,
      email,
      password: hashedPassword,
      idRol: clientRol.idRol,
    });

    const token = generateToken(newUser);
    const refreshToken = generateRefreshToken(newUser);

    await newUser.update({ refreshToken });

    return {
      user: {
        idUser: newUser.idUser,
        email: newUser.email,
        idRol: newUser.idRol,
      },
      token,
    };
  } catch (error) {
    throw new Error(error.message || "Error en el registro");
  }
};
