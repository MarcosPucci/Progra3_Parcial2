import salesService from "../service/sales.service.js";

// CONTROLADOR DE VENTAS
// Maneja las peticiones HTTP relacionadas con ventas

const salesController = {
  // POST /api/finalizar-compra - Finalizar una compra
  async finalizarCompra(req, res) {
    try {
      const productos = req.body; // Array de productos del carrito

      // Validaciones básicas
      if (!productos || !Array.isArray(productos) || productos.length === 0) {
        return res.status(400).json({
          success: false,
          message: "El carrito está vacío o es inválido",
        });
      }

      // Validar que cada producto tenga los campos necesarios
      for (const producto of productos) {
        if (!producto.id || !producto.precio || !producto.cantidad) {
          return res.status(400).json({
            success: false,
            message: "Datos de producto incompletos",
          });
        }
      }

      const nuevaVenta = await salesService.finalizarCompra(productos);

      res.status(201).json({
        success: true,
        data: {
          id: nuevaVenta.id,
          total: nuevaVenta.total,
          cantidadProductos: nuevaVenta.cantidadProductos,
          fecha: nuevaVenta.fecha
        },
        message: "Compra finalizada correctamente",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al finalizar compra",
        error: error.message,
      });
    }
  },

  // GET /api/ventas/:id - Obtener una venta por ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      const venta = await salesService.getById(id);

      res.status(200).json({
        success: true,
        data: venta,
        message: "Venta obtenida correctamente",
      });
    } catch (error) {
      if (error.message === "Venta no encontrada") {
        return res.status(404).json({
          success: false,
          message: error.message,
        });
      }

      res.status(500).json({
        success: false,
        message: "Error al obtener venta",
        error: error.message,
      });
    }
  },

  // GET /api/ventas - Obtener todas las ventas
  async getAll(req, res) {
    try {
      const ventas = await salesService.getAll();

      res.status(200).json({
        success: true,
        data: ventas,
        message: "Ventas obtenidas correctamente",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al obtener ventas",
        error: error.message,
      });
    }
  },
};

export default salesController; 