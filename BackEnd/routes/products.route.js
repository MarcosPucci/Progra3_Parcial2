import { Router } from "express"
import productsController from "../controllers/products.controller.js"

// RUTAS DE AUTENTICACIÓN
// Define las URLs para login y autenticación
const router = Router()

// GET ./products - Obtener todos los productos
router.get("/", productsController.getAll)

// GET ./products/active - Obtener productos activos
router.get("/active", productsController.getActive)

// GET ./productos/:id - Obtener un producto específico
router.get("/:id", productsController.getById)

// POST ./productos - Crear un nuevo producto
router.post("/", productsController.create)

// PUT ./productos/:id - Actualizar un producto existente
router.put("/:id", productsController.update)

// DELETE ./productos/:id - Desactivar un producto
router.delete("/:id", productsController.deactivate)

// PATCH ./productos/:id/activate - Activar un producto
router.patch("/:id/activate", productsController.activate)

export default router