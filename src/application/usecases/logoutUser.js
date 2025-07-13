import { saveUserAction } from "../../infrastructure/database/models/actionsLog.js";
import { tokenBlacklist } from "../../infrastructure/database/models/tokenBlacklist.js";

export const logoutUser = async (userId, token, expiredAt) => {
  if (!userId || !token || !expiredAt)
    throw new Error("No hay suficiente información");

  try {
    await tokenBlacklist.create({ token, expiredAt });
    await saveUserAction(userId, "logout");

    return { message: "Sesión cerrada exitosamente" };
  } catch (error) {
    throw new Error("Error en logout: " + error.message);
  }
};
