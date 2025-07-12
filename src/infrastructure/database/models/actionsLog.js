import mongoose from "mongoose";

//Generamos el esquema para generar logs de lo que hace el usuario

const userActionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  action: { type: String, required: true },
  timestamp: { type: Date, default: Date.now, required: true },
});

//Se asigna el esquema al modelo
const userAction = mongoose.model("UserAction", userActionSchema);

//Función para guardar los logs
export const saveUserAction = async (userId, action) => {
  const newLog = new userAction({ userId, action });
  await newLog.save();
};
