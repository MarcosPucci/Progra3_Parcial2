import { Router } from "express";
import authController from "../controllers/auth.controller.js";

const router = Router();

// POST /loginAdmin.ejs - Login de admin (ruta específica para el formulario)
router.post("/loginAdmin.ejs", authController.login);

// POST /api/auth/login - Login de admin (ruta API)
router.post("/login", authController.login);

// POST /api/auth/register - Registrar nuevo admin
router.post("/register", authController.register);

// POST /api/auth/logout - Logout
router.post("/logout", authController.logout);

// GET /api/auth/profile - Obtener perfil del admin
router.get("/profile", authController.getProfile);

// POST /api/auth/change-password - Cambiar contraseña
router.post("/change-password", authController.changePassword);

export default router; 