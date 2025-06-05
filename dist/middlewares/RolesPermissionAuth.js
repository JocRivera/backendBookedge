import { getUserByIdService } from "../services/Users_Services.js";

export const authorize = (requiredPermission, requiredPrivilege) => async (req, res, next) => {
  try {
    const userId = req.user.idUser;
    const user = await getUserByIdService(userId);

    if (!user || !user.role || !user.role.permissionRoles) {
      return res.status(403).json({ message: "No tienes permisos asignados" });
    }

    // Recorremos los permisos del rol del usuario
    const hasAccess = user.role.permissionRoles.some((permRole) => {
      return (
        permRole.permissions?.name === requiredPermission &&
        permRole.privileges?.name === requiredPrivilege
      );
    });

    if (!hasAccess) {
      return res.status(403).json({ message: "No tienes permisos suficientes" });
    }

    next();
  } catch (error) {
    console.error("Error en la autorización:", error);
    res.status(500).json({ message: "Error interno al validar permisos" });
  }
};
