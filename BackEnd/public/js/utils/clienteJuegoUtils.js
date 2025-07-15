import { JuegoUtils } from './juegoUtils.js';

export class ClienteJuegoUtils extends JuegoUtils {
  constructor(btnCarrito) {
    super()
    this.listCarrito = JSON.parse(localStorage.getItem("listCarrito")) || [];
    this.btnCarrito = btnCarrito;
  }

  // Cargar datos de juegos desde la API
  async cargarDatosJuegos(url) {
    try {
      const response = await fetch(url); ///api/productos/
      const data = await response.json();
      this.datos = data.data;
      return this.datos;
    } catch (err) {
      console.error("Error:", err);
      return [];
    }
  }

  // Crear botones específicos para cliente
  crearBtnesExtra(juego) {
    const divBotones = document.createElement("div");
    divBotones.className = "d-flex justify-content-center gap-2 flex-wrap my-2";

    const btnAgregarCarrito = document.createElement("button");
    btnAgregarCarrito.textContent = "Agregar al Carrito";
    btnAgregarCarrito.className = "btn btn-primary fw-bold px-3";

    btnAgregarCarrito.addEventListener("click", (event) => {
      event.preventDefault();
      this.agregarAlCarrito(juego);
    });

    divBotones.appendChild(btnAgregarCarrito);

    return divBotones;
  }

  // Agregar juego al carrito
  agregarAlCarrito(juego) {
    const juegoEnCarrito = this.listCarrito.find(j => j.id === juego.id);
    
    if (juegoEnCarrito) {
      juegoEnCarrito.cantidad += 1;
    } else {
      this.listCarrito.push({
        ...juego,
        cantidad: 1
      });
    }
    localStorage.setItem('listCarrito', JSON.stringify(this.listCarrito));
    this.mostrarNotificacion(`¡${juego.titulo} agregado al carrito!`);
    this.mostrarCantidadEnCarrito();
  }

  mostrarCantidadEnCarrito() {
    let cantidad = 0;
    this.listCarrito.forEach(juego => {
        cantidad += juego.cantidad;
    });
    this.btnCarrito.textContent = `🛒 Carrito: ${cantidad}`;
}

  // Mostrar notificación
  mostrarNotificacion(mensaje) {
    const notificacion = document.createElement("div");
    notificacion.className = "alert alert-success position-fixed top-0 end-0 m-3";
    notificacion.style.zIndex = "1000";
    notificacion.textContent = mensaje;
    
    document.body.appendChild(notificacion);
    
    setTimeout(() => {
      notificacion.remove();
    }, 2500);
  }
}