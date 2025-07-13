import express from "express";
import { signup } from "../infrastructure/controllers/userController.js";
import { login } from "../infrastructure/controllers/userController.js";
import { actionLogsController } from "../infrastructure/controllers/actionLogsController.js";
import { authJwt } from "../middleware/authJwt.js";
import { logout } from "../infrastructure/controllers/userController.js";

//Router de usuarios

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
//Usamos el middleware de Auth para proteger las rutas que exigen JWT
//Además que con ese middleware extraemos los datos de la sesión.
router.get("/logs", authJwt, actionLogsController);
router.get("/logout", authJwt, logout);

export default router;
