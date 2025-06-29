import Venta from "../models/sale.model.js";

// SERVICIO DE VENTAS
// Contiene la lógica para manejar ventas usando Sequelize

const salesService = {
    // Finalizar una compra
    async finalizarCompra(productos) {
        try {
            // Calcular el total de la venta
            const total = productos.reduce((sum, producto) => {
                return sum + (producto.precio * producto.cantidad);
            }, 0);

            // Calcular cantidad total de productos
            const cantidadProductos = productos.reduce((sum, producto) => {
                return sum + producto.cantidad;
            }, 0);

            // Crear la venta en la base de datos
            const nuevaVenta = await Venta.create({
                total: total,
                cantidadProductos: cantidadProductos,
                productos: JSON.stringify(productos), // Guardar productos como JSON string
                estado: 'completada'
            });

            return nuevaVenta;
        } catch (error) {
            throw new Error(`Error al finalizar compra: ${error.message}`);
        }
    },

    // Obtener una venta por ID
    async getById(id) {
        try {
            const venta = await Venta.findByPk(id);
            if (!venta) {
                throw new Error('Venta no encontrada');
            }
            
            // Parsear los productos de vuelta a objeto
            venta.productos = JSON.parse(venta.productos);
            return venta;
        } catch (error) {
            throw new Error(`Error al obtener venta: ${error.message}`);
        }
    },

    // Obtener todas las ventas
    async getAll() {
        try {
            const ventas = await Venta.findAll({
                order: [['fecha', 'DESC']] // Mas recientes primero
            });
            
            // Parsear productos de cada venta
            ventas.forEach(venta => {
                venta.productos = JSON.parse(venta.productos);
            });
            
            return ventas;
        } catch (error) {
            throw new Error(`Error al obtener ventas: ${error.message}`);
        }
    }
};

export default salesService; 