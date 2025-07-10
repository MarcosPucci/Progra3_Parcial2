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

let categoriaActual = "PS4";
let tema = localStorage.getItem("tema") || "oscuro";
let datos = [];

btnPc.addEventListener("click", async (event) =>{
  event.preventDefault();
  categoriaActual = "PC";
  initAdmin(categoriaActual);
});

btnPlay.addEventListener("click", async (event) =>{
  event.preventDefault();
  categoriaActual = "PS4"
  initAdmin(categoriaActual);
});

btnAgregar.addEventListener("click", (event) =>{
  event.preventDefault();
  window.location.href = "/edicion-admin";
});

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

window.addEventListener("DOMContentLoaded", () => { //"DOMContentLoaded" = Cuando este todo el html cargado.
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
};

function filtarJuegoCategoria(categoriaJuego){
  let datosFiltrados = datos.filter(j => j.categoria === categoriaJuego);

  return datosFiltrados;
};

function cargarDatosJuegos() {
  return fetch("/api/productos/")
    .then(res => res.json())
    .then(res => res.data)
    .catch(err => {
      console.error("Error:", err);
      return [];
    });
};

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
};

function addJuego(juego){
    const divContenedorDeCard = document.createElement("div");
    divContenedorDeCard.className = "my-3 col-12 col-sm-6 col-md-4 text-break"; //Clases de bootstrap para hacer responsive el mostrado de los juegos.

    const divCard = document.createElement("div");
    divCard.className = "card bg-black tarjeta-juego"; //Clase de bootstrap para dar formato a la presentacion del juego

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
    parrPrecio.className = "text-center fw-bold text-success fs-4 text-tarjetas"; //centro texto, pongo en negrita, pinto de verde, aumenta el tamaño.

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

      juego.activo = !juego.activo;
      btnEstadoProducto.textContent = juego.activo ? "Desactivar" : "Activar";

      try {
        let response;
        if (juego.activo) {
          response = await fetch(`/api/productos/${juego.id}/activate`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' }
          });
        } else {
          response = await fetch(`/api/productos/${juego.id}`, {
            method: 'DELETE'
          });
        }

        if (response.ok) {
          const data = await response.json();
        } else {
          alert('Error al cambiar el estado del producto');
        }
      } catch (err) {
        console.error('Error al conectar con el servidor:', err);
        alert('No se pudo actualizar el estado en la base de datos');
      }
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
};

function renderJuegos(datosJuegos){
    divContenedorDatos.innerHTML = "";
    
    datosJuegos.forEach(juego => {
        divContenedorDatos.appendChild(addJuego(juego));
    });
    cambiarTemaDeTarjetas();
};

async function initAdmin(categoriaJuego) {
  datos = await cargarDatosJuegos();
  renderJuegos(filtarJuegoCategoria(categoriaJuego));
};

initAdmin(categoriaActual);