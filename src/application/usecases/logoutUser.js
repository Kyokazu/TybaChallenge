import { saveUserAction } from "../../infrastructure/database/models/actionsLog.js";
import { tokenBlacklist } from "../../infrastructure/database/models/tokenBlacklist.js";

//Caso de uso: Cierre de sesión del usuario
//Como implementación de seguridad adicional, se guarda el token en una blacklist.
export const logoutUser = async (userId, token, expiredAt) => {
  if (!userId || !token || !expiredAt)
    throw new Error("No hay suficientes datos para cerrar la sesión");

  try {
    //Guardamos el token en la blacklist
    await tokenBlacklist.create({ token, expiredAt });
    //Generamos un log
    await saveUserAction(userId, "logout");

    return { message: "Sesión cerrada exitosamente" };
  } catch (error) {
    throw new Error("Error en logout: " + error.message);
  }
};
