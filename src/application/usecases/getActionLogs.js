import { ActionLog } from "../../infrastructure/database/models/actionsLog.js";

export const getUserActions = async (userId) => {
  if (!userId) throw new Error("Falta userId");

  try {
    const actions = await ActionLog.find({ userId }).sort({ timestamp: -1 });
    return actions.map((action) => ({
      action: action.action,
      timestamp: action.timestamp,
    }));
  } catch (err) {
    //throw new Error("Error al consultar logs del usuario: " + err.message);
  }
};
