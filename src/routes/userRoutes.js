import express from 'express';
import userController from '../infrastructure/controllers/userController.js';

const router = express.Router();

router.post("signup", userController.signup);
router.post("login", userController.login);

export default router;