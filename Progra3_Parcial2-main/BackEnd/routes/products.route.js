import { Router } from "express"
import productsController from "../controllers/products.controller.js"

// RUTAS DE AUTENTICACIÓN
// Define las URLs para login y autenticación
const router = Router()

// GET ./products - Obtener todos los productos
router.get("/", productsController.getAll)

// GET ./products/active - Obtener productos activos
router.get("/active", productsController.getActive)

// GET ./products/:id - Obtener un producto específico
router.get("/:id", productsController.getById)

// RECORDATORIO: faltan los del admin



export default router