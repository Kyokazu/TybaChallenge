import mongoose from "mongoose";

//Se crea el esquema para MongoDB.

const userScheme = new mongoose.Schema(
  {
    email: { type: String, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

//Se asigna el esquema al modelo
const userModel = mongoose.model("User", userScheme);

export default userModel;
