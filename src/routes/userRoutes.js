import express from "express";
import { signup } from "../infrastructure/controllers/userController.js";
import { login } from "../infrastructure/controllers/userController.js";
import { actionLogsController } from "../infrastructure/controllers/actionLogsController.js";
import { authJwt } from "../middleware/authJwt.js";
import { logout } from "../infrastructure/controllers/userController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logs", authJwt, actionLogsController);
router.get("/logout", authJwt, logout);

export default router;
