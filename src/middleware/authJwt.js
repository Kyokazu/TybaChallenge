import jwt from "jsonwebtoken";
import { tokenBlacklist } from "../infrastructure/database/models/tokenBlacklist.js";

export const authJwt = async (req, res, next) => {
  const authHeader = req.headers.authorization;
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

    // Guardamos el token y el userId en `req.user`
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
