const divContenedorDatos = document.getElementById("div-contenedor");
const btnCambiarTema = document.getElementsByClassName("boton-tema-pagina")[0];
const bodyPagina = document.getElementsByClassName("body-pagina")[0];
const headerPagina = document.getElementsByClassName("barra-menu")[0];
const divCatalogo = document.getElementsByClassName("div-catalogo")[0];
const btnesCategorias = document.querySelectorAll(".btn-categorias");

btnCambiarTema.addEventListener("click", (event) => {
  event.preventDefault();

  const esClaro = bodyPagina.classList.contains("body-claro");

  bodyPagina.classList.toggle("body-claro", !esClaro);
  headerPagina.classList.toggle("header-claro", !esClaro);
  divCatalogo.classList.toggle("div-catalogo-claro", !esClaro);

  btnesCategorias.forEach(boton => {
    boton.classList.toggle("boton-claro", !esClaro);
  });

  localStorage.setItem("tema", !esClaro ? "claro" : "oscuro");

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

function cargarDatosJuegosPlay() {
  return fetch("/static/json/juegos.json") //Devuelvo la lista filtrada, si es que la promesa no tiene erroes
    .then(res => res.json())
    .then(datosJuegos => datosJuegos.filter(juego => juego.activo))
    .catch(err => {
      console.error("Error:", err);
      return [];
    });
};

function cargarDatosJuegosPc() {
  return fetch("/static/json/juegosPc.json") //Devuelvo la lista filtrada, si es que la promesa no tiene erroes
    .then(res => res.json())
    .then(datosJuegos => datosJuegos.filter(juego => juego.activo))
    .catch(err => {
      console.error("Error:", err);
      return [];
    });
};

function addJuego(juego){
    const divContenedorDeCard = document.createElement("div");
    divContenedorDeCard.className = "my-3 col-12 col-sm-6 col-md-4 text-break"; //Clases de bootstrap para hacer responsive el mostrado de los juegos.

    const divCard = document.createElement("div");
    divCard.className = "card"; //Clase de bootstrap para dar formato a la presentacion del juego

    const imgJuego = document.createElement("img");
    imgJuego.src = "/static/img/ghost.jpg";
    imgJuego.alt = `Juego de: ${juego.titulo}`;

    const tituloH3 = document.createElement("h3");
    tituloH3.innerText = `${juego.titulo}`;
    tituloH3.className = "text-center fw-bold";

    const parrDescripcion = document.createElement("p");
    parrDescripcion.innerText = `${juego.descripcion}`;
    parrDescripcion.className = "text-center";

    const parrPrecio = document.createElement("p");
    parrPrecio.innerText = `$${juego.precio}`;
    parrPrecio.className = "text-center fw-bold text-success fs-4"; //centro texto, pongo en negrita, pinto de verde, aumenta el tamaño.

    const divBotones = document.createElement("div");
    divBotones.className = "d-flex justify-content-center gap-2 flex-wrap my-2";

    const btnEditar = document.createElement("button");
    btnEditar.textContent = "Editar";
    btnEditar.className = "btn btn-warning fw-bold px-3";
    btnEditar.addEventListener("click", (event) =>{
      event.preventDefault();
      window.location.href = "/edicion-admin";
      // window.location.href = `/edicion-admin/${juego.id}`;
    });

    btnEditar.addEventListener("click", (event) =>{
        event.preventDefault();
        
    });

    const btnEstadoProducto = document.createElement("button");
    btnEstadoProducto.textContent = juego.activo ? "Desactivar" : "Activar";
    btnEstadoProducto.className = "btn btn-secondary fw-bold px-3";

    btnEstadoProducto.addEventListener("click", (event) =>{
      event.preventDefault();
      juego.activo = !juego.activo;
      btnEstadoProducto.textContent = juego.activo ? "Desactivar" : "Activar";
    })

    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.className = "btn btn-danger fw-bold px-3";

    divBotones.appendChild(btnEditar);
    divBotones.appendChild(btnEstadoProducto);
    divBotones.appendChild(btnEliminar);

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
};

async function initCliente() {
  let datos = await cargarDatosJuegosPlay();
  renderJuegos(datos);
  mostrarCantidadEnCarrito();
};

initCliente();