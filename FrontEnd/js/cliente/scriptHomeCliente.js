/*====================================HOME DEL CLIENTE============================================*/

/*~~~~~~~~~~~~~ Etiquetas a usar del html ~~~~~~~~~~~~~*/

const divContenedorDatos = document.getElementById("div-contenedor");
const inputBuscar = document.getElementById("input-buscar");
const btnCarrito = document.getElementById("btn-carrito");
const btnPc = document.getElementById("btn-pc");
const btnPlay = document.getElementById("btn-play");
const btnTemaClaro = document.getElementsByClassName("boton-tema-pagina")[0];

const headerPagina = document.getElementsByClassName("barra-menu")[0];
const bodyPagina = document.getElementsByClassName("body-pagina")[0];
const divCatalogo = document.getElementsByClassName("div-catalogo")[0];
const btnesCategorias = document.querySelectorAll(".btn-categorias");

/*~~~~~~~~~~~~~ Variables a usar~~~~~~~~~~~~~*/

let listCarrito = JSON.parse(localStorage.getItem("listCarrito")) || [];
const tema = localStorage.getItem("tema");

/*~~~~~~~~~~~~~ Funciones del home ~~~~~~~~~~~~~*/

window.addEventListener("DOMContentLoaded", () => { //"DOMContentLoaded" = Cuando este todo el html cargado.
  if (tema === "claro") {
    bodyPagina.classList.add("body-claro");
    headerPagina.classList.add("header-claro");
    divCatalogo.classList.add("div-catalogo-claro");

    btnesCategorias.forEach(boton => {
      boton.classList.add("boton-claro");
    });
  };
});

btnTemaClaro.addEventListener("click", (event) =>{
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
  localStorage.setItem("tema", !esClaro ? "claro" : "oscuro");
});

btnCarrito.addEventListener("click", (event) =>{
  event.preventDefault();
  window.location.href = "/htmlCliente/carrito.html";
});

btnPc.addEventListener("click", async (event) =>{
  event.preventDefault();
  categoriaActual = "PC";
  initCliente(categoriaActual);
});

btnPlay.addEventListener("click", async (event) =>{
  event.preventDefault();
  categoriaActual = "PS4"
  initCliente(categoriaActual);
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

function cargarDatosJuegos() {
  return fetch("/api/products/")
    .then(res => res.json())
    .then(res => res.data.filter(juego => juego.activo))
    .catch(err => {
      console.error("Error:", err);
      return [];
    });
};

function addJuego(juego){
    const divContenedorDeCard = document.createElement("div");
    divContenedorDeCard.className = "my-3 col-12 col-sm-6 col-md-4 text-break"; //Clases de bootstrap para hacer responsive el mostrado de los juegos.

    const divCard = document.createElement("div");
    divCard.className = "card bg-black tarjeta-juego"; //Clase de bootstrap para dar formato a la presentacion del juego

    const imgJuego = document.createElement("img");
    imgJuego.src = `/${juego.img}`;
    
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

    const btnFav = document.createElement("button");
    btnFav.textContent = "Agregar al carrito";
    btnFav.className = "btn btn-success fw-bold rounded-pill px-4 py-2";

    btnFav.addEventListener("click", (event) =>{
        event.preventDefault();
        const juegoEnCarrito = listCarrito.find(j => j.id === juego.id && j.categoria === juego.categoria);
        if(!juegoEnCarrito){
          juego.cantidad = 1;
          listCarrito.push(juego);
        }
        else{
          juegoEnCarrito.cantidad += 1;
        };
        localStorage.setItem("listCarrito", JSON.stringify(listCarrito));
        mostrarCantidadEnCarrito();
    });

    divCard.appendChild(imgJuego);
    divCard.appendChild(tituloH3);
    divCard.appendChild(parrDescripcion);
    divCard.appendChild(parrPrecio);
    divCard.appendChild(btnFav);
    divContenedorDeCard.appendChild(divCard);
    return divContenedorDeCard;
};

function renderJuegos(datosJuegos){
    divContenedorDatos.innerHTML = "";
    datosJuegos.forEach(juego => {
        divContenedorDatos.appendChild(addJuego(juego));
    });
    cambiarTemaDeTarjetas();
};

function mostrarCantidadEnCarrito(){
  let cantidad = 0;

  listCarrito.forEach(juego =>{
    cantidad += juego.cantidad;
  });
  btnCarrito.textContent = `🛒 Carrito: ${cantidad}`;
};

async function initCliente(categoriaJuego) {
  if (!divContenedorDatos){    
    return;
  };
  datos = await cargarDatosJuegos();
  renderJuegos(filtarJuegoCategoria(categoriaJuego));
  mostrarCantidadEnCarrito();
};

let datos = [];
let categoriaActual = "PS4";
initCliente(categoriaActual);