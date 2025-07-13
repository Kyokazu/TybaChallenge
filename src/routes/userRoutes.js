import express from "express";
import { signup } from "../infrastructure/controllers/userController.js";
import { login } from "../infrastructure/controllers/userController.js";
import { actionLogsController } from "../infrastructure/controllers/actionLogsController.js";
import { authJwt } from "../middleware/authJwt.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logs", authJwt, actionLogsController);

export default router;
