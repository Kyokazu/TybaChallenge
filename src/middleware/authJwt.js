import jwt from "jsonwebtoken";
import { tokenBlacklist } from "../infrastructure/database/models/tokenBlacklist.js";

// Middleware de Auth, valida el token con verify
export const authJwt = async (req, res, next) => {
  // Obtenemos la información del header y extraemos el token
  const authHeader = req.headers.authorization;
  //Quitamos el "Bearer " del token.
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  try {
    // Revisar si está en blacklist
    const isBlacklisted = await tokenBlacklist.findOne({ token });
    if (isBlacklisted) {
      return res.status(403).json({ message: "Token inválido por logout" });
    }
    // Verificar token y extraer datos
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Guardamos datos del usuario en el request.
    req.user = {
      id: decoded.id,
      token: token,
      exp: decoded.exp,
    };
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expirado" });
    }
    return res.status(401).json({ message: "Token inválido" });
  }
};
