import bcrypt from "bcryptjs";
import { Users } from "../models/user_Model.js";
import { generateToken, generateRefreshToken } from "../utils/jwt.js";
import { Roles } from "../models/Roles_Model.js";
import crypto from "crypto";
import { sendResetPasswordEmail } from "../utils/emails.js";

export const loginService = async (email, password) => {
  try {
    const user = await Users.findOne({ 
      where: { email },
      include: [{ 
        model: Roles, 
        as: 'role',
        attributes: ['name'] 
      }]
    });

    if (!user || !user.status) {
      throw new Error("Correo o contraseña incorrectos");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Correo o contraseña incorrectos");
    }

    const token = generateToken(user);
    const refreshToken = generateRefreshToken(user);

    if (user.refreshToken !== refreshToken) {
      await user.update({ refreshToken });
    }

    return {
      user: {
        id: user.idUser,       // Mejor usar "id" para consistencia
        name: user.name,       // Asegura que el modelo tenga esta propiedad
        email: user.email,
        role: user.role?.name  // Nombre del rol en lugar del ID
      },
      token,
      refreshToken
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
      refreshToken
    };
  } catch (error) {
    throw new Error(error.message || "Error en el registro");
  }
};

export const recoveryPassword = async (email) => {
  const user = await Users.findOne({ where: { email } });
  if (!user) {
    throw new Error("El correo no se encuentra registrado");
  }
  const resetToken = crypto.randomBytes(32).toString("hex");//genera un token aleatorio criptografico
  const resetTokenExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutos

  await user.update({ resetToken, resetTokenExpires });

  const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
  console.log("Token de recuperación generado:", resetToken);

  await sendResetPasswordEmail(email, resetLink);
};

export const resetPasswordService = async (token, newPassword) => {
  const user = await Users.findOne({ where: { resetToken: token } });

  if (!user || user.resetTokenExpires < new Date()) {
    throw new Error("Token inválido o expirado");
  }
  

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await user.update({
    password: hashedPassword,
    resetToken: null,
    resetTokenExpires: null,
  });
};
