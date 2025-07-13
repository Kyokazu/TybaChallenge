import { getUserActions } from "../../application/usecases/getActionLogs.js";

//Controller de logs
export const actionLogsController = async (req, res) => {
  try {
    //Verifico que el usuario este autenticado
    const userId = req.user.id;
    if (!userId)
      return res.status(401).json({ error: "Usuario no autenticado" });
    //Obtengo los logs
    const actions = await getUserActions(userId);
    res.status(200).json(actions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
