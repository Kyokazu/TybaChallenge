import jws from "jsonwebtoken";

export const authJwt = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No hay token en la operación" });
  }

  try {
    const decoded = jws.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token inválido" });
  }
};
