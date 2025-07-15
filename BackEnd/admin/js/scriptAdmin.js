import { AdminJuegoUtils } from '../utils/adminJuegoUtils.js';

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

if (typeof window.categoriaActual === 'undefined') {
  window.categoriaActual = "PS4";
}
if (typeof window.productosData === 'undefined') {
  window.productosData = [];
}

let tema = localStorage.getItem("tema") || "oscuro";
let datos = window.productosData;

const adminJuegoUtils = new AdminJuegoUtils(datos);

inputBuscar.addEventListener("keyup", (event) =>{
  event.preventDefault();
  const texto = event.target.value;
  const juegosFiltrados = adminJuegoUtils.buscarNombreJuego(texto);
  adminJuegoUtils.renderJuegos(juegosFiltrados, divContenedorDatos);
  cambiarTemaDeTarjetas();
});

// Event listeners para cambio de categoría
btnPc.addEventListener("click", async (event) =>{
  event.preventDefault();
  adminJuegoUtils.categoriaActual = "PC";
  adminJuegoUtils.renderJuegos(adminJuegoUtils.filtrarJuegoCategoria(), divContenedorDatos);
  cambiarTemaDeTarjetas();
});

btnPlay.addEventListener("click", async (event) =>{
  event.preventDefault();
  adminJuegoUtils.categoriaActual = "PS4";
  adminJuegoUtils.renderJuegos(adminJuegoUtils.filtrarJuegoCategoria(), divContenedorDatos);
  cambiarTemaDeTarjetas();
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

// Funcion que se llama desde el HTML, cambia el estado de un producto
window.cambiarEstadoProducto = function(button, id, activo){
  adminJuegoUtils.cambiarEstadoProducto(button, id, activo);
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
}

cambiarTemaDeTarjetas();