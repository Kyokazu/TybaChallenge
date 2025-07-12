import express from "express";
import { signup } from "../infrastructure/controllers/userController.js";
import { login } from "../infrastructure/controllers/userController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

export default router;
