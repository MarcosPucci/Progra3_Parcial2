import { Juego } from "../models/product.model.js"
import products from "../../frontend/public/data/juegos.json" with { type: "json" }


// SERVICIO DE PRODUCTOS
// Contiene la lógica para manejar productos

const juegos = []

products.forEach((j) => {
  juegos.push(j)
})

const productsService = {
    // Obtiene todos los productos
    getAll() {
        return products
    },

    // Obtiene solo productos activos
    getActive() {
        return juegos.filter((juego) => juego.activo)
    },

    // Obtiene productos por categoria
    getByCategory(categoria) {
        return products.filter((juego) => juego.categoria === categoria)
    },

    // Obtiene por ID
    getById(id) {
        return products.filter((juego) => juego.id === id)
    },

    create(productData) {
        const nuevoJuego = new Juego(
            productData.nombre,
            productData.titulo,
            productData.genero,
            productData.añoDeSalida,
            productData.precio,
            productData.categoria,
            productData.img,
            productData.descripcion,
        )

        juegos.push(nuevoJuego)
        return nuevoJuego

    },

    // Actualizar un producto existente
    update(id, productData) {
        const juego = this.getById(id)

        if(!juego) {
            throw new Error('Juego no encontrado')
        }

        juego.update(productData)
        return juego
    },


    //Desactivar un producto
    deactivate(id) {
        const juego = this.getById(id)

        if (!juego) {
            throw new Error("Juego no encontrado")
        }

        juego.deactivate()
        return juego
    },

    // Activar un producto
     activate(id) {
        const juego = this.getById(id)

        if (!juego) {
            throw new Error("Juego no encontrado")
        }

        juego.activate()
        return juego
    },
}

export default productsService
