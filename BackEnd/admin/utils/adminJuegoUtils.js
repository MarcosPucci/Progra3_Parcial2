import { JuegoUtils } from '/js/utils/juegoUtils.js';

export class AdminJuegoUtils extends JuegoUtils {
  constructor(datos) {
    super();
    this.datos = datos;
  }

  async cambiarEstadoProducto(button, id, activo) {
    try {
      const nuevoEstado = !activo;
      
      let response;
      if (nuevoEstado) {
        response = await fetch(`/api/productos/${id}/activate`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' }
        });
      } else {
        response = await fetch(`/api/productos/${id}`, {
          method: 'DELETE'
        });
      }
  
      if (response.ok) {
        button.textContent = nuevoEstado ? "Desactivar" : "Activar";
        button.setAttribute("data-activo", nuevoEstado);
        
        const producto = this.datos.find(p => p.id === id);
        if (producto) {
          producto.activo = nuevoEstado;
        }
  
        button.onclick = () => cambiarEstadoProducto(button, id, nuevoEstado);
      } else {
        alert('Error al cambiar el estado del producto');
      }
    } catch (err) {
      console.error('Error al conectar con el servidor:', err);
      alert('No se pudo actualizar el estado en la base de datos');
    }
  };

  crearBtnesExtra(juego){
    const divBotones = document.createElement("div");
    divBotones.className = "d-flex justify-content-center gap-2 flex-wrap my-2";

    const btnEditar = document.createElement("button");
    btnEditar.textContent = "Editar";
    btnEditar.className = "btn btn-warning fw-bold px-3";

    btnEditar.addEventListener("click", (event) => {
      event.preventDefault();
      window.location.href = `/edicion-admin?id=${juego.id}`;
    });

    const btnEstadoProducto = document.createElement("button");
    btnEstadoProducto.textContent = juego.activo ? "Desactivar" : "Activar";
    btnEstadoProducto.className = "btn btn-secondary fw-bold px-3";

    btnEstadoProducto.addEventListener("click", async (event) => {
      event.preventDefault();
      await this.cambiarEstadoProducto(btnEstadoProducto, juego.id, juego.activo);
    });

    divBotones.appendChild(btnEditar);
    divBotones.appendChild(btnEstadoProducto);

    return divBotones;
  }
} 