import jwt from "jsonwebtoken";
import { tokenBlacklist } from "../infrastructure/database/models/tokenBlacklist.js";

export const authJwt = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  console.log(token);

  if (!token) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  try {
    console.log("TRY--->");
    // Revisar si está en blacklist
    const isBlacklisted = await tokenBlacklist.findOne({ token });
    console.log("TRY2--->" + isBlacklisted);
    if (isBlacklisted) {
      return res.status(403).json({ message: "Token expirado" });
    }
    console.log("TRY3--->");
    // Verificar token y extraer datos
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("DECODED ID--->" + decoded.id);
    console.log("DECODED EXP--->" + decoded.exp);
    console.log("RESPONSE --->" + res.status);

    // Guardamos el token y el userId en `req.user`
    req.user = {
      id: decoded.id,
      token: token,
      exp: decoded.exp,
    };
    console.log("REQUEST USER --->" + req.user);
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expirado" });
    }
    return res.status(401).json({ message: "Token inválido" });
  }
};
