// MODELO DE PRODUCTO
// Define la estructura de un juego en nuestro sistema

export class Juego {
    constructor(nombre, titulo, genero, anioDeSalida, precio, categoria, img = "default.jpg", descripcion) {
        this.id = crypto.randomUUID
        this.nombre = nombre,
        this.titulo = titulo,
        this.genero = genero,
        this.añoDeSalida = Number.parseInt(anioDeSalida),
        this.precio = Number.parseFloat(precio),
        this.categoria = categoria,
        this.img = img,
        this.activo = true,
        this.descripcion = descripcion,
        this.cantidad = 1
    }


    desactivate() {
        this.active = false
    }

    activate() {
        this.active = true
    }

    //RECORDATORIO: hacer el update
}