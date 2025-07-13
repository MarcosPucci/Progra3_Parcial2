import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// RUTAS PARA CLIENTES (página principal)
router.get("/", (req, res) => {
  // Esta es la página que ven los CLIENTES en el autoservicio
  res.sendFile(path.join(__dirname, "..", "public", "htmlCliente", "inicioCliente.html"))
})

router.get("/homeCliente", (req, res) => {
  // Ruta directa para acceder a homeCliente.html
  res.sendFile(path.join(__dirname, "..", "public", "htmlCliente", "homeCliente.html"))
})

router.get("/home-cliente", (req, res) => {
  // Ruta alternativa con guión para acceder a homeCliente.html
  res.sendFile(path.join(__dirname, "..", "public", "htmlCliente", "homeCliente.html"))
})

router.get("/carritoCliente", (req, res) => {
  // Ruta directa para acceder a carrito.html
  res.sendFile(path.join(__dirname, "..", "public", "htmlCliente", "carrito.html"))
})

router.get("/ticketCliente", (req, res) => {
  // Ruta para mostrar el ticket de la venta
  res.sendFile(path.join(__dirname, "..", "public", "htmlCliente", "facturaCliente.html"))
})

export default router; 