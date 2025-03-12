import { getUserByIdService } from "../services/Users_Services.js";

export const authorize = (requiredPermissions) => async (req, res, next) => {
  try {
    const userId = req.user.idUser;
    const user = await getUserByIdService(userId);

    if (!user) {
      return res.status(403).json({ message: "Usuario no encontrado" });
    }

    const hasPermission = user.role.permissions.some((perm) =>
      requiredPermissions.includes(perm.name)
    );
    console.log(hasPermission);
    

    if (!hasPermission) {
      return res.status(403).json({ message: "No tienes permisos suficientes" });
    }
    next();
  } catch (error) {
    console.error("Error en la autorización:", error);
    res.status(500).json({ message: "Error interno al validar permisos" });
  }
};
