import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../../infrastructure/database/models/userModel.js";
import { saveUserAction } from "../../infrastructure/database/models/actionsLog.js";

// Caso de uso: Login de usuario
/*Parámetro de ingreso de login:
*{
  "email": "nombre@dominio.com",
  "password": "password"
}
*/
export const loginUser = async ({ email, password }) => {
  // Buscar que existe un usuario registrado con ese correo
  const user = await userModel.findOne({ email });
  if (!user) {
    throw new Error("Usuario no registrado");
  }
  //Verificar credenciales
  //Error NO debe mencionar cual valor es el incorrecto(email/password)
  const passValidation = await bcrypt.compare(password, user.password);
  if (!passValidation) {
    throw new Error("Credenciales no válidas");
  }
  //Se firma el token y se ingresa el Id del usuario en el payload.
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  //Registro en el Log de actividades.
  await saveUserAction(user._id, "login");
  return {
    token,
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
    },
  };
};
