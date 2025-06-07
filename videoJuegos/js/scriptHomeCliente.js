/*====================================HOME DEL CLIENTE============================================*/

/*~~~~~~~~~~~~~ Etiquetas a usar del html ~~~~~~~~~~~~~*/

const divContenedorDatos = document.getElementById("div-contenedor");
const btnCarrito = document.getElementById("btn-carrito");
const btnPc = document.getElementById("btn-pc");
const btnPlay = document.getElementById("btn-play");

/*~~~~~~~~~~~~~ Variables a usar~~~~~~~~~~~~~*/

let listCarrito = JSON.parse(localStorage.getItem("listCarrito")) || [];

/*~~~~~~~~~~~~~ Funciones del home ~~~~~~~~~~~~~*/

btnPc.addEventListener("click", async (event) =>{
  event.preventDefault();
  let datos = await cargarDatosJuegosPc();
  renderJuegos(datos);
});

btnPlay.addEventListener("click", async (event) =>{
  event.preventDefault();
  initCliente();
});

function cargarDatosJuegosPlay() {
  return fetch("json/juegos.json") //Devuelvo la lista filtrada, si es que la promesa no tiene erroes
    .then(res => res.json())
    .then(datosJuegos => datosJuegos.filter(juego => juego.activo))
    .catch(err => {
      console.error("Error:", err);
      return [];
    });
};

function cargarDatosJuegosPc() {
  return fetch("json/juegosPc.json") //Devuelvo la lista filtrada, si es que la promesa no tiene erroes
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
    imgJuego.src = "img/ghost.jpg";
    imgJuego.alt = `Juego de: ${juego.titulo}`;

    const tituloH3 = document.createElement("h3");
    tituloH3.innerText = `${juego.titulo}`;
    tituloH3.className = "text-center fw-bold";

    const parrDescripcion = document.createElement("p");
    parrDescripcion.innerText = `${juego.descripcion}`;
    parrDescripcion.className = "text-center";

    const parrPrecio = document.createElement("p");
    parrPrecio.innerText = `$${juego.precio}`;
    parrPrecio.className = "text-center fw-bold text-success fs-4" //centro texto, pongo en negrita, pinto de verde, aumenta el tamaño.

    const btnFav = document.createElement("button");
    btnFav.textContent = "Agregar al carrito";
    btnFav.className = "btn btn-success fw-bold rounded-pill px-4 py-2";

    btnFav.addEventListener("click", (event) =>{
        event.preventDefault();
        const juegoEnCarrito = listCarrito.find(j => j.id === juego.id);
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
};

function mostrarCantidadEnCarrito(){
  let cantidad = 0;

  listCarrito.forEach(juego =>{
    cantidad += juego.cantidad;
  });
  btnCarrito.textContent = `🛒 Carrito: ${cantidad}`;
};

async function initCliente() {
  if (!divContenedorDatos){    
    return;
  }
  let datos = await cargarDatosJuegosPlay();
  renderJuegos(datos);
  mostrarCantidadEnCarrito();
}

initCliente();