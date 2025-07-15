/*====================================HOME DEL CLIENTE REFACTORIZADO============================================*/

import { ClienteJuegoUtils } from '../utils/clienteJuegoUtils.js';

/*~~~~~~~~~~~~~ Etiquetas a usar del html ~~~~~~~~~~~~~*/
const divContenedorDatos = document.getElementById("div-contenedor");
const bodyPagina = document.querySelector("body");
const headerPagina = document.querySelector("header");
const divCatalogo = document.querySelector(".div-catalogo");
const btnesCategorias = document.querySelectorAll(".btn-categorias");
const inputBuscar = document.getElementById("input-buscar");
const btnCarrito = document.getElementById("btn-carrito");
const btnPc = document.getElementById("btn-pc");
const btnPlay = document.getElementById("btn-play");
const btnCambiarTema = document.getElementsByClassName("boton-tema-pagina")[0];

/*~~~~~~~~~~~~~ Variables a usar~~~~~~~~~~~~~*/
let tema = localStorage.getItem("tema") || "oscuro";
const juegoUtils = new ClienteJuegoUtils(btnCarrito);

/*~~~~~~~~~~~~~ Event Listeners ~~~~~~~~~~~~~*/

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

// Navegación
btnCarrito.addEventListener("click", (event) => {
  event.preventDefault();
  window.location.href = "/carritoCliente";
});

btnPc.addEventListener("click", async (event) => {
  event.preventDefault();
  juegoUtils.categoriaActual = "PC"; // Cambia la categoría actual en al clase
  initCliente(); // Inicializa de 0 la pagina para cargar posibles cambios en la BD por un admin.
});

btnPlay.addEventListener("click", async (event) => {
  event.preventDefault();
  juegoUtils.categoriaActual = "PS4"; // Cambia la categoría actual en al clase
  initCliente(); // Inicializa de 0 la pagina para cargar posibles cambios en la BD por un admin.
});

// Búsqueda
inputBuscar.addEventListener("keyup", (event) => {
  event.preventDefault();
  const texto = event.target.value;
  const juegosFiltrados = juegoUtils.buscarNombreJuego(texto, juegoUtils.categoriaActual);
  juegoUtils.renderJuegos(juegosFiltrados, divContenedorDatos);
});

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

// Funcion para iniciar la pagina.
async function initCliente() {
  await juegoUtils.cargarDatosJuegos("api/productos/active"); // Carga los datos de los juegos activos.
  juegoUtils.renderJuegos(juegoUtils.filtrarJuegoCategoria(), divContenedorDatos); // Renderiza los juegos en la pagina.
  juegoUtils.mostrarCantidadEnCarrito(); // Muestra la cantidad de juegos en el carrito.
  cambiarTemaDeTarjetas()
}

/*~~~~~~~~~~~~~ Inicialización ~~~~~~~~~~~~~*/
initCliente(); 