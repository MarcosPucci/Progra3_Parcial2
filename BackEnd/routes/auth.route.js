import { Router } from "express";
import authController from "../controllers/auth.controller.js";

const router = Router();

// POST /api/auth/login - Login de admin (ruta API)
router.post("/login", authController.login);

export default router; 