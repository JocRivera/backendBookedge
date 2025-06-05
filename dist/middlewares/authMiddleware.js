// authMiddleware.js (Backend)
import jwt from "jsonwebtoken";
import { Users } from "../models/user_Model.js"; // Asegúrate que las rutas sean correctas
import { Roles } from "../models/Roles_Model.js"; // Asegúrate que las rutas sean correctas

export const verifyToken = async (req, res, next) => {
  console.log("--- verifyToken Middleware ---");
  console.log("Request Path:", req.path);
  // console.log("Request Headers:", JSON.stringify(req.headers, null, 2)); // Descomenta para depuración intensa de headers

  // No proteger la ruta de refresh con este mismo middleware si el refresh token
  // se maneja de forma diferente (ej. se verifica su existencia en la BD directamente).
  // Si /auth/refresh también necesita algún tipo de "autenticación" (ej. un API key básico),
  // esa lógica iría en su propio middleware o directamente en el controlador de refresh.
  // Por ahora, si tu ruta de refresh no está protegida por este verifyToken, está bien.
  // if (req.path === "/auth/refresh") { // Esta condición puede que ya no la necesites aquí
  //   return next();                 // si la ruta de refresh no usa este middleware.
  // }

  let token;

  // 1. Intentar obtener el token de la cabecera Authorization (para APIs, móvil, SPA)
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1]; // Extrae el token después de "Bearer "
    console.log("Token found in Authorization header.");
  }
  // 2. Si no está en la cabecera, intentar obtenerlo de las cookies (para web tradicional con cookies)
  else if (req.cookies && req.cookies.authToken) {
    token = req.cookies.authToken;
    console.log("Token found in cookies.");
  }

  if (!token) {
    console.log(
      "verifyToken: No token found in Authorization header or cookies. Responding 401."
    );
    return res.status(401).json({ message: "Acceso denegado. No hay Token" });
  }

  console.log(
    "Token to verify:",
    token ? "Present" : "Absent (esto no debería pasar si llegamos aquí)"
  );

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(
      "verifyToken: Token decoded successfully for user ID:",
      decoded.idUser
    );

    const user = await Users.findByPk(decoded.idUser, {
      include: [{ model: Roles, as: "role", attributes: ["idRol", "name"] }],
    });

    if (!user) {
      console.log(
        "verifyToken: User not found for decoded ID. Responding 401."
      );
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    if (!user.status) {
      console.log("verifyToken: User account inactive. Responding 403.");
      return res
        .status(403)
        .json({ message: "Cuenta inactiva, acceso denegado" });
    }

    req.user = decoded; // Guardar la info del usuario decodificada en la request
    console.log("verifyToken: Authentication successful. Calling next().");
    next();
  } catch (error) {
    console.error(
      "verifyToken: JWT verification failed (invalid or expired token).",
      error.message
    );
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
};
