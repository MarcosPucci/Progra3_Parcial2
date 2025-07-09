import { Router } from "express"
import productsController from "../controllers/products.controller.js"
import upload from "../middleware/upload.js"

// RUTAS DE PRODUCTOS
// Define las URLs para productos
const router = Router()

// GET ./products - Obtener todos los productos
router.get("/", productsController.getAll)

// GET ./products/active - Obtener productos activos
router.get("/active", productsController.getActive)

// GET ./productos/:id - Obtener un producto específico
router.get("/:id", productsController.getById)

// POST ./productos - Crear un nuevo producto (con subida de imagen)
router.post("/", upload.single('imagen'), productsController.create)

// PUT ./productos/:id - Actualizar un producto existente (con subida de imagen)
router.put("/:id", upload.single('imagen'), productsController.update)

// DELETE ./productos/:id - Desactivar un producto
router.delete("/:id", productsController.deactivate)

// PATCH ./productos/:id/activate - Activar un producto
router.patch("/:id/activate", productsController.activate)

export default router