import bcrypt from "bcryptjs";
import { Users } from "../models/user_Model.js";
import { generateToken, generateRefreshToken } from "../utils/jwt.js";
import { Roles } from "../models/Roles_Model.js";
import { Permissions } from "../models/Permissions_Model.js"; // NECESITARÁS ESTOS MODELOS
import { PermissionRoles } from "../models/Permission_Roles.js"; // NECESITARÁS ESTOS MODELOS
import { Privileges } from "../models/Privileges_Model.js";
import crypto from "crypto";
import { sendResetPasswordEmail } from "../utils/emails.js";
import jwt from "jsonwebtoken";  // Asegúrate de importar jwt para decodificar el refresh token

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

    if (!user ) {
      throw new Error("Correo o contraseña incorrectos");
    }else if (!user.status){
      throw new Error("Tu cuenta se encuentra inactiva");
      
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Correo o contraseña incorrectos");
    }

    const token = generateToken(user);
    console.log("Token generado:", token);

    const refreshToken = generateRefreshToken(user);

    // Decodificar el refreshToken para obtener la expiración
    const decodedRefreshToken = jwt.decode(refreshToken);
    console.log("Refresh token expira en:", new Date(decodedRefreshToken.exp * 1000).toLocaleString()); // Muestra la fecha de expiración del refreshToken

    if (user.refreshToken !== refreshToken) {
      await user.update({ refreshToken });
      console.log("Refresh token actualizado en la base de datos");
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

export const refreshAccessToken = async (currentRefreshToken) => {
  if (!currentRefreshToken) {
    throw new Error("No se proporcionó refresh token");
  }

  const user = await Users.findOne({ where: { refreshToken: currentRefreshToken } });

  // Verifica si el usuario existe y si su estado es activo
  if (!user || !user.status) { 
    // Si el usuario no existe o está inactivo, el refresh token no es válido
    throw new Error("Refresh token inválido o usuario inactivo");
  }

  // Genera un nuevo token de acceso
  const newAccessToken = generateToken(user);
  
  let newRefreshToken = null; // Por defecto no se rota

  // --- LÓGICA OPCIONAL DE ROTACIÓN DE REFRESH TOKEN ---
  // Podrías decidir rotar el refresh token aquí si quieres mayor seguridad,
  // por ejemplo, cada vez que se usa, o después de X usos, o si está cerca de expirar.
  // Para simplificar, asumiremos que el refresh token tiene una vida larga y no lo rotamos en cada refresh.
  // Si quisieras rotarlo:
  // newRefreshToken = generateRefreshToken(user);
  // await user.update({ refreshToken: newRefreshToken });
  // console.log("Nuevo Refresh Token generado y guardado:", newRefreshToken);

  const responseObject = { token: newAccessToken };
  // if (newRefreshToken) { // Solo si se generó uno nuevo
  //   responseObject.refreshToken = newRefreshToken;
  // }
  return responseObject; // Devuelve el nuevo access token (y el nuevo refresh token si se rotó)
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
  const resetToken = crypto.randomBytes(32).toString("hex"); // Genera un token aleatorio criptográfico
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
export const updateProfileService = async (idUser, updateData) => {
  console.log("--- updateProfileService (Backend) ---");
  console.log("idUser para actualizar:", idUser);
  console.log("updateData recibida:", JSON.stringify(updateData, null, 2));

  try {
    const userToUpdate = await Users.findByPk(idUser);
    if (!userToUpdate) {
      console.log("Usuario no encontrado en updateProfileService para ID:", idUser);
      throw new Error('Usuario no encontrado para actualizar');
    }

    // Campos permitidos para ser actualizados directamente desde el perfil del usuario
    const allowedFields = ['name', 'identification', 'identificationType', 'eps', 'cellphone', 'address', 'birthdate'];
    const filteredUpdateData = {};
    for (const key of allowedFields) {
      // Solo incluir el campo en la actualización si realmente vino en updateData
      // y no es undefined (para permitir enviar "" para limpiar un campo opcional).
      if (updateData.hasOwnProperty(key)) {
        filteredUpdateData[key] = updateData[key];
      }
    }
    console.log("filteredUpdateData a aplicar:", JSON.stringify(filteredUpdateData, null, 2));

    if (Object.keys(filteredUpdateData).length > 0) {
      console.log("Intentando user.update()...");
      await userToUpdate.update(filteredUpdateData); // Sequelize aplicará hooks y validaciones de modelo si no usas { validate: false }
      console.log("user.update() exitoso.");
    } else {
      console.log("No hay campos válidos para actualizar después del filtrado.");
    }

    console.log("Intentando recargar el usuario con roles y permisos...");
    const reloadedUser = await Users.findByPk(idUser, {
      attributes: {
        exclude: ['password', 'refreshToken', 'resetToken', 'resetTokenExpires']
      },
      include: [
        {
          model: Roles,
          as: "role", // Asegúrate que 'as: "role"' coincida con tu Users.belongsTo(Roles, {as: 'role'})
          attributes: ["idRol", "name"],
          include: [
            {
              model: PermissionRoles,
              as: "permissionRoles", // Asegúrate que 'as: "permissionRoles"' coincida con Roles.hasMany(PermissionRoles, {as: 'permissionRoles'})
              attributes: ["idPermissionRole"], // Puedes omitir attributes si solo quieres las asociaciones
              include: [
                {
                  model: Permissions,
                  as: "permissions", // Asegúrate que 'as: "permissions"' coincida con PermissionRoles.belongsTo(Permissions, ...)
                  attributes: ["idPermission", "name"],
                },
                {
                  model: Privileges,
                  as: "privileges",  // Asegúrate que 'as: "privileges"' coincida con PermissionRoles.belongsTo(Privileges, ...)
                  attributes: ["idPrivilege", "name"],
                },
              ],
            },
          ],
        },
      ],
    });

    if (!reloadedUser) {
      console.error("Fallo al recargar el usuario después de la actualización para ID:", idUser);
      throw new Error("No se pudo recargar el usuario después de la actualización.");
    }
    console.log("Usuario recargado exitosamente con permisos. Data del Rol:", JSON.stringify(reloadedUser.role, null, 2));
    return reloadedUser.toJSON(); // Devuelve el objeto plano

  } catch (serviceError) {
    console.error("ERROR EN updateProfileService:", serviceError);
    // Considera si quieres loguear serviceError.stack para más detalle en desarrollo
    throw serviceError; // Re-lanza para que el controlador lo maneje
  }
};