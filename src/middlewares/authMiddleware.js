import jwt from "jsonwebtoken";
import { Users } from "../models/user_Model.js";
import { Roles } from "../models/Roles_Model.js";

export const  verifyToken = async (req, res, next) => {
  const token = req.cookies.authToken; // Obtener el token desde las cookies

  if (!token) {
    return res.status(401).json({ message: "Acceso denegado. No hay Token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Users.findByPk(decoded.idUser,{
      include: [{ model: Roles, as: "role", attributes: ["idRol", "name"] }]

    });

    if (!user) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    if (!user.status) {
      return res.status(403).json({ message: "Cuenta inactiva, acceso denegado" });
    }

    req.user = decoded; // Guardar la info del usuario en la request
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
};
