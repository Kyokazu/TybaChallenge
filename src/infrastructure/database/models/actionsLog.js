import mongoose from "mongoose";

const actionLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  action: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export const ActionLog = mongoose.model("UserActions", actionLogSchema);
//Función para guardar los logs
export const saveUserAction = async (userId, action) => {
  const newLog = new ActionLog({ userId, action });
  await newLog.save();
};
