// Módulo para funciones comunes de juegos
export class JuegoUtils {
    constructor() {
      this.datos = [];
      this.categoriaActual = "PS4";
    }
  
    // Filtrar juegos por categoría
    filtrarJuegoCategoria() {
      return this.datos.filter(j => j.categoria === this.categoriaActual);
    }
  
    // Buscar juegos por nombre
    buscarNombreJuego(texto) {
      return this.datos.filter(j => 
        j.categoria === this.categoriaActual && 
        j.titulo.toLowerCase().includes(texto.toLowerCase())
      );
    }
  
    crearBtnesExtra(juego){
      throw new Error("Método no implementado en la clase padre");
    }
  
    // Crear tarjeta de juego para admin
    crearTarjetaJuego(juego) {
      const divContenedorDeCard = document.createElement("div");
      divContenedorDeCard.className = "my-3 col-12 col-sm-6 col-md-4 text-break";
  
      const divCard = document.createElement("div");
      divCard.className = "card bg-black tarjeta-juego";
  
      const imgJuego = document.createElement("img");
      imgJuego.src = `/static/img/${juego.img}`;
      imgJuego.alt = `Juego de: ${juego.titulo}`;
  
      const tituloH3 = document.createElement("h3");
      tituloH3.innerText = `${juego.titulo}`;
      tituloH3.className = "text-center fw-bold text-white tarjeta-juego";
  
      const parrDescripcion = document.createElement("p");
      parrDescripcion.innerText = `${juego.descripcion}`;
      parrDescripcion.className = "text-center text-white tarjeta-juego";
  
      const parrPrecio = document.createElement("p");
      parrPrecio.innerText = `$${juego.precio}`;
      parrPrecio.className = "text-center fw-bold text-success fs-4 text-tarjetas";
  
      divCard.appendChild(imgJuego);
      divCard.appendChild(tituloH3);
      divCard.appendChild(parrDescripcion);
      divCard.appendChild(parrPrecio);
      divCard.appendChild(this.crearBtnesExtra(juego));
      divContenedorDeCard.appendChild(divCard);
  
      return divContenedorDeCard;
    }
  
    // Renderizar juegos
    renderJuegos(datosJuegos, contenedor) {
      contenedor.innerHTML = "";

      if (datosJuegos.length === 0) {
        contenedor.innerHTML = `
          <div class="col-12 text-center">
            <p class="text-white">No se encontraron productos que coincidan con la búsqueda.</p>
          </div>
        `;
        return;
      };

      datosJuegos.forEach(juego => {
          contenedor.appendChild(this.crearTarjetaJuego(juego));
      });
    }
  }