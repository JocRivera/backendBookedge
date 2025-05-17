import {
  loginService,
  registerCustomerService,
  refreshAccessToken,
  logoutService,
  recoveryPassword,
  resetPasswordService,
  updateProfileService,
} from "../services/authService.js";
import { getUserByIdService } from "../services/Users_Services.js";
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

export const recoveryPasswordController = async (req, res) => {
  try {
    const { email } = req.body;
    await recoveryPassword(email);
    return res.status(200).json({ message: "correo de recuperación enviado" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const resetPasswordController = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    await resetPasswordService(token, newPassword);
    return res
      .status(200)
      .json({ message: "Contraseña Reestablecida correctamente" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const getUserProfileController = async (req, res) => {
  try {
    const userId = req.user.idUser;
    const user = await getUserByIdService(userId);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Convertir a objeto plano con .toJSON() antes de manipular
    const userPlain = user.toJSON();
    const { password, ...rest } = userPlain;

    return res.status(200).json(rest);
  } catch (error) {
    console.error("Error al obtener el perfil del usuario:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const updateProfileController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    // Validar que el usuario actualice solo su perfil
    if (parseInt(req.params.id) !== req.user.idUser) {
      return res.status(403).json({
        message: "Solo puedes actualizar tu propio perfil",
      });
    }

    // Eliminar campos no permitidos aunque vengan en la solicitud
    const { idRol, password, ...safeData } = req.body;

    const updatedUser = await updateProfileService(req.params.id, safeData);
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: "Error backend"});
  }
};
