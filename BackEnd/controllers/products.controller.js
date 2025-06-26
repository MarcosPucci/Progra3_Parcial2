import productsService from "../service/products.service.js"

// CONTROLADOR DE PRODUCTOS
// Maneja las peticiones HTTP relacionadas con productos

const productsController = {
  // GET /api/products - Obtener todos los productos
  async getAll(req, res) {
    try {
      const products = await productsService.getAll()
      res.status(200).json({
        success: true,
        data: products,
        message: "Productos obtenidos correctamente",
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al obtener productos",
        error: error.message,
      })
    }
  },

  // GET /api/products/active - Obtener solo productos activos
  async getActive(req, res) {
    try {
      const products = await productsService.getActive()
      res.status(200).json({
        success: true,
        data: products,
        message: "Productos activos obtenidos correctamente",
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al obtener productos activos",
        error: error.message,
      })
    }
  },

  // GET /api/products/:id - Obtener un producto por ID
  async getById(req, res) {
    try {
      const { id } = req.params // Extraemos el ID de los parámetros de la URL
      const product = await productsService.getById(id)

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Producto no encontrado",
        })
      }

      res.status(200).json({
        success: true,
        data: product,
        message: "Producto obtenido correctamente",
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al obtener producto",
        error: error.message,
      })
    }
  },

  // POST /api/products - Crear un nuevo producto
  async create(req, res) {
    try {
      const productData = req.body // Datos enviados en el cuerpo de la petición

      // Validaciones básicas
      if (!productData.titulo || !productData.precio || !productData.categoria) {
        return res.status(400).json({
          success: false,
          message: "Faltan datos requeridos: titulo, precio, categoria",
        })
      }

      const newProduct = await productsService.create(productData)

      res.status(201).json({
        success: true,
        data: newProduct,
        message: "Producto creado correctamente",
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al crear producto",
        error: error.message,
      })
    }
  },

  // PUT /api/products/:id - Actualizar un producto
  async update(req, res) {
    try {
      const { id } = req.params
      const productData = req.body

      const updatedProduct = await productsService.update(id, productData)

      res.status(200).json({
        success: true,
        data: updatedProduct,
        message: "Producto actualizado correctamente",
      })
    } catch (error) {
      if (error.message === "Producto no encontrado") {
        return res.status(404).json({
          success: false,
          message: error.message,
        })
      }

      res.status(500).json({
        success: false,
        message: "Error al actualizar producto",
        error: error.message,
      })
    }
  },

  // DELETE /api/products/:id - Desactivar un producto
  async deactivate(req, res) {
    try {
      const { id } = req.params
      const product = await productsService.deactivate(id)

      res.status(200).json({
        success: true,
        data: product,
        message: "Producto desactivado correctamente",
      })
    } catch (error) {
      if (error.message === "Producto no encontrado") {
        return res.status(404).json({
          success: false,
          message: error.message,
        })
      }

      res.status(500).json({
        success: false,
        message: "Error al desactivar producto",
        error: error.message,
      })
    }
  },

  // PATCH /api/products/:id/activate - Activar un producto
  async activate(req, res) {
    try {
      const { id } = req.params
      const product = await productsService.activate(id)

      res.status(200).json({
        success: true,
        data: product,
        message: "Producto activado correctamente",
      })
    } catch (error) {
      if (error.message === "Producto no encontrado") {
        return res.status(404).json({
          success: false,
          message: error.message,
        })
      }

      res.status(500).json({
        success: false,
        message: "Error al activar producto",
        error: error.message,
      })
    }
  },
}

export default productsController