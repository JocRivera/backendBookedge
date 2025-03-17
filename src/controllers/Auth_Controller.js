import {
  loginService,
  registerCustomerService,
  refreshAccessToken,
  logoutService,
} from "../services/authService.js";
import { validationResult } from "express-validator";

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token, refreshToken } = await loginService(email, password);

    // Almacenoooooooooo el token de acceso en una cookie httpOnly
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 1000, // 1 hora
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días
    });

    return res.status(200).json({ message: "Login exitoso", user });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const registerController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { user, token, refreshToken } = await registerCustomerService(
      req.body
    );

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 1000, // 1 hora
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({ message: "Registro exitoso", user });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const refreshTokenController = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken)
      return res.status(401).json({ message: "No hay refresh token" });

    const { token } = await refreshAccessToken(refreshToken);

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 1000, // 1 hora
    });

    return res.status(200).json({ message: "Token renovado" });
  } catch (error) {
    return res.status(403).json({ message: error.message });
  }
};

export const logoutController = async (req, res) => {
  try {
    await logoutService(req.user.idUser);

    // Elimina las cookies de autenticación y refreshToken
    res.clearCookie("authToken");
    res.clearCookie("refreshToken");

    return res.status(200).json({ message: "Sesión cerrada exitosamente" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
