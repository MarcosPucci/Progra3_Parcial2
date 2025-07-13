import express from "express";
const router = express.Router();

// RUTAS PARA ADMIN
router.get("/login-admin", (req, res) => {
  // Ruta para el login del admin
  res.render("loginAdmin")
})

router.get("/admin", async (req, res) => {
  try {
    // Importar el servicio de productos
    const productsService = (await import("../service/products.service.js")).default;
    const products = await productsService.getAll();

    res.render("homeAdmin", { 
      products: products,
      categoriaActual: "PS4" // Categoría por defecto
    });
  } catch (error) {
    console.error("Error al cargar productos:", error);
    res.render("homeAdmin", { 
      products: [],
      categoriaActual: "PS4"
    });
  }
})

router.get("/edicion-admin", (req, res) => {
  // Ruta alternativa para editar productos
  res.render("edicionAdmin")
})

router.get("/ventas-realizadas", async (req, res) => {
  // Ruta para mostrar ventas realizadas
  try {
    // Importar el servicio de ventas
    const salesService = (await import("../service/sales.service.js")).default;
    const ventas = await salesService.getAll();
    
    res.render("ventasRealizadas", { 
      ventas: ventas
    });
  } catch (error) {
    console.error("Error al cargar ventas:", error);
    res.render("ventasRealizadas", { 
      ventas: []
    });
  }
})

export default router; 