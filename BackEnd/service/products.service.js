import Juego from "../models/product.model.js"

// SERVICIO DE PRODUCTOS
// Contiene la lógica para manejar productos usando Sequelize

const productsService = {
    // Obtiene todos los productos
    async getAll() {
        try {
            const productos = await Juego.findAll()
            return productos
        } catch (error) {
            throw new Error(`Error al obtener productos: ${error.message}`)
        }
    },

    // Obtiene solo productos activos
    async getActive() {
        try {
            const productos = await Juego.findAll({
                where: {
                    activo: true
                }
            })
            return productos
        } catch (error) {
            throw new Error(`Error al obtener productos activos: ${error.message}`)
        }
    },

    // Obtiene productos por categoria
    async getByCategory(categoria) {
        try {
            const productos = await Juego.findAll({
                where: {
                    categoria: categoria,
                    activo: true
                }
            })
            return productos
        } catch (error) {
            throw new Error(`Error al obtener productos por categoría: ${error.message}`)
        }
    },

    // Obtiene por ID
    async getById(id) {
        try {
            const producto = await Juego.findByPk(id)
            return producto
        } catch (error) {
            throw new Error(`Error al obtener producto por ID: ${error.message}`)
        }
    },

    // Crear un nuevo producto
    async create(productData) {
        try {
            const nuevoJuego = await Juego.create({
                titulo: productData.titulo,
                genero: productData.genero,
                categoria: productData.categoria,
                precio: productData.precio,
                descripcion: productData.descripcion,
                img: productData.img,
                activo: true,
                cantidad: productData.cantidad || 1
            })
            return nuevoJuego
        } catch (error) {
            throw new Error(`Error al crear producto: ${error.message}`)
        }
    },

    // Actualizar un producto existente
    async update(id, productData) {
        try {
            const producto = await Juego.findByPk(id)
            
            if (!producto) {
                throw new Error('Producto no encontrado')
            }

            await producto.update(productData)
            return producto
        } catch (error) {
            throw new Error(`Error al actualizar producto: ${error.message}`)
        }
    },

    // Desactivar un producto
    async deactivate(id) {
        try {
            const producto = await Juego.findByPk(id)
            
            if (!producto) {
                throw new Error("Producto no encontrado")
            }

            await producto.update({ activo: false })
            return producto
        } catch (error) {
            throw new Error(`Error al desactivar producto: ${error.message}`)
        }
    },

    // Activar un producto
    async activate(id) {
        try {
            const producto = await Juego.findByPk(id)
            
            if (!producto) {
                throw new Error("Producto no encontrado")
            }

            await producto.update({ activo: true })
            return producto
        } catch (error) {
            throw new Error(`Error al activar producto: ${error.message}`)
        }
    },
}

export default productsService
