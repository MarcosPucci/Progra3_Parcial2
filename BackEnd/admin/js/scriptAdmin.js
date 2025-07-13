const divContenedorDatos = document.getElementById("div-contenedor");
const btnCambiarTema = document.getElementsByClassName("boton-tema-pagina")[0];
const bodyPagina = document.getElementsByClassName("body-pagina")[0];
const headerPagina = document.getElementsByClassName("barra-menu")[0];
const inputBuscar = document.getElementById("input-buscar");
const divCatalogo = document.getElementsByClassName("div-catalogo")[0];
const btnesCategorias = document.querySelectorAll(".btn-categorias");
const btnPc = document.getElementById("btn-pc");
const btnPlay = document.getElementById("btn-play");
const btnAgregar = document.getElementById("btn-agregar-p");

// Usar las variables globales definidas en EJS o valores por defecto
if (typeof window.categoriaActual === 'undefined') {
  window.categoriaActual = "PS4";
}
if (typeof window.productosData === 'undefined') {
  window.productosData = [];
}

let categoriaActual = window.categoriaActual;
let tema = localStorage.getItem("tema") || "oscuro";
let datos = window.productosData;

// Event listeners para cambio de categoría
btnPc.addEventListener("click", async (event) =>{
  event.preventDefault();
  categoriaActual = "PC";
  filtrarYRenderizarProductos();
});

btnPlay.addEventListener("click", async (event) =>{
  event.preventDefault();
  categoriaActual = "PS4";
  filtrarYRenderizarProductos();
});

btnAgregar.addEventListener("click", (event) =>{
  event.preventDefault();
  window.location.href = "/edicion-admin";
});

// Función para cambiar estado de producto
window.cambiarEstadoProducto = async function(button, id, activo) {
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
      // Actualizar el botón
      button.textContent = nuevoEstado ? "Desactivar" : "Activar";
      button.setAttribute("data-activo", nuevoEstado);
      
      // Actualizar el producto en los datos locales
      const producto = datos.find(p => p.id === id);
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

btnCambiarTema.addEventListener("click", (event) => {
  event.preventDefault();
  const tarjetas = document.querySelectorAll(".tarjeta-juego");
  const esClaro = bodyPagina.classList.contains("body-claro");

  bodyPagina.classList.toggle("body-claro", !esClaro);
  headerPagina.classList.toggle("header-claro", !esClaro);
  divCatalogo.classList.toggle("div-catalogo-claro", !esClaro);

  btnesCategorias.forEach(boton => {
    boton.classList.toggle("boton-claro", !esClaro);
  });
  tarjetas.forEach(card => {
    card.classList.toggle("bg-black", esClaro);
    card.classList.toggle("text-white", esClaro);
    card.classList.toggle("bg-light", !esClaro);
    card.classList.toggle("text-black", !esClaro);
  });
  tema = !esClaro ? "claro" : "oscuro";
  localStorage.setItem("tema", tema);
});

window.addEventListener("DOMContentLoaded", () => {
  const tema = localStorage.getItem("tema");
  if (tema === "claro") {
    bodyPagina.classList.add("body-claro");
    headerPagina.classList.add("header-claro");
    divCatalogo.classList.add("div-catalogo-claro");

    btnesCategorias.forEach(boton => {
      boton.classList.add("boton-claro");
    });
  }
});

inputBuscar.addEventListener("keyup", (event) =>{
  event.preventDefault();
  const texto = event.target.value;
  const juegosFiltrados = buscarNombreJuego(texto);
  renderJuegos(juegosFiltrados);
});

function buscarNombreJuego(texto) {
  let nuevosDatos = datos.filter(j => j.categoria === categoriaActual && j.titulo.toLowerCase().includes(texto.toLowerCase()));
  return nuevosDatos;
}

function filtarJuegoCategoria(categoriaJuego){
  let datosFiltrados = datos.filter(j => j.categoria === categoriaJuego);
  return datosFiltrados;
}

function cambiarTemaDeTarjetas() {
  const tarjetas = document.querySelectorAll(".tarjeta-juego");

  tarjetas.forEach(card => {
    card.classList.remove("bg-black", "text-white", "bg-light", "text-black");

    if (tema === "oscuro") {
      card.classList.add("bg-black", "text-white");
    } else {
      card.classList.add("bg-light", "text-black");
    }
  });
}

function addJuego(juego){
    const divContenedorDeCard = document.createElement("div");
    divContenedorDeCard.className = "my-3 col-12 col-sm-6 col-md-4 text-break";

    const divCard = document.createElement("div");
    divCard.className = "card bg-black tarjeta-juego";

    const imgJuego = document.createElement("img");
    imgJuego.src = `/static/${juego.img}`;
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

    const divBotones = document.createElement("div");
    divBotones.className = "d-flex justify-content-center gap-2 flex-wrap my-2";

    const btnEditar = document.createElement("button");
    btnEditar.textContent = "Editar";
    btnEditar.className = "btn btn-warning fw-bold px-3";

    btnEditar.addEventListener("click", (event) =>{
      event.preventDefault();
      window.location.href = `/edicion-admin?id=${juego.id}`;
    });

    const btnEstadoProducto = document.createElement("button");
    btnEstadoProducto.textContent = juego.activo ? "Desactivar" : "Activar";
    btnEstadoProducto.className = "btn btn-secondary fw-bold px-3";

    btnEstadoProducto.addEventListener("click", async (event) => {
      event.preventDefault();
      await cambiarEstadoProducto(btnEstadoProducto, juego.id, juego.activo);
    });

    divBotones.appendChild(btnEditar);
    divBotones.appendChild(btnEstadoProducto);

    divCard.appendChild(imgJuego);
    divCard.appendChild(tituloH3);
    divCard.appendChild(parrDescripcion);
    divCard.appendChild(parrPrecio);
    divContenedorDeCard.appendChild(divCard);
    divCard.appendChild(divBotones);
    return divContenedorDeCard;
}

function renderJuegos(datosJuegos){
    divContenedorDatos.innerHTML = "";
    
    if (datosJuegos.length === 0) {
      divContenedorDatos.innerHTML = `
        <div class="col-12 text-center">
          <p class="text-white">No se encontraron productos que coincidan con la búsqueda.</p>
        </div>
      `;
      return;
    }
    
    datosJuegos.forEach(juego => {
        divContenedorDatos.appendChild(addJuego(juego));
    });
    cambiarTemaDeTarjetas();
}

function filtrarYRenderizarProductos() {
  const productosFiltrados = filtarJuegoCategoria(categoriaActual);
  renderJuegos(productosFiltrados);
}

cambiarTemaDeTarjetas();