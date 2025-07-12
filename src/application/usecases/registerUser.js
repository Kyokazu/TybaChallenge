import bcrypt from "bcrypt";
import userModel from "../../infrastructure/database/models/userModel.js";
import { user } from "../../domain/entities/user.js";
import { saveUserAction } from "../../infrastructure/database/models/actionsLog.js";
import e from "express";

export const registerUser = async ({ email, name, password }) => {

  //Primero revisamos si ya existe un usuario registrado, email debe ser único
  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    throw new Error("El usuario ya existe");
  }

  const userEntity = new user({ email, name, password });
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(userEntity.password, salt);

  const newUser = new userModel({
    email: userEntity.email,
    name: userEntity.name,
    password: hashedPassword,
  });

  const userSaved = await newUser.save();
  await saveUserAction(userSaved);
  return {
    id: userSaved._id,
    email: userSaved.email,
    name: userSaved.name,
  };
};
