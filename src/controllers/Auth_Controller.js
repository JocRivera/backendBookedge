import {
  loginService,
  registerCustomerService,
  editProfileService,
  getProfileService,
} from "../services/authService.js";

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await loginService(email, password);

    res.cookie("authToken", token, {
      httpOnly: true, // Evita acceso desde JavaScript (más seguro) es ddecir ingresa desde el servidor
      secure: process.env.NODE_ENV === "production", // Solo en HTTPS
      maxAge: 3600000, // Expira en 1 hora
    });
    res.status(200).json({ message: "Login exitoso", user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const registerController = async (req, res) => {
  try {
    const result = await registerCustomerService(req.body);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
export const getProfileController = async (req, res) => {
  try {
    const user = await getProfileService(req.user.idUser);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const editProfileController = async (req, res) => {
  try {
    const idUser = req.user.idUser; // Tomamos el ID del usuario autenticado del token que cree
    const updatedProfile = await editProfileService(idUser, req.body);
    return res.status(200).json(updatedProfile);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const logoutController = (req, res) => {
  res.clearCookie("authToken");
  res.status(200).json({ message: "Sesión cerrada exitosamente" });
};
