import express from "express";
import salesController from "../controllers/sales.controller.js";

const router = express.Router();

// POST /api/finalizarCompra - Finalizar una compra
router.post("/finalizarCompra", salesController.finalizarCompra);

// GET /api/ventas - Obtener todas las ventas
router.get("/ventas", salesController.getAll);

// GET /api/ventas/:id - Obtener una venta por ID
router.get("/ventas/:id", salesController.getById);

export default router; 