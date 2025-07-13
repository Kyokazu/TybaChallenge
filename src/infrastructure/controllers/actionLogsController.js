import { getUserActions } from "../../application/usecases/getActionLogs.js";

export const actionLogsController = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("USER ID PARTE 1-----> " + userId);
    if (!userId)
      return res.status(401).json({ error: "Usuario no autenticado" });

    const actions = await getUserActions(userId);
    res.status(200).json(actions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
