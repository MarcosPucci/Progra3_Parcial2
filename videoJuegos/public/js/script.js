/*====================================HOME DEL CLIENTE============================================*/

/*~~~~~~~~~~~~~ Etiquetas a usar del html~~~~~~~~~~~~~*/

const divContenedorDatos = document.getElementById("div-contenedor");
const btnCarrito = document.getElementById("btn-carrito");

/*~~~~~~~~~~~~~ Variables a usar~~~~~~~~~~~~~*/

let listCarrito = JSON.parse(localStorage.getItem("listCarrito")) || [];

/*~~~~~~~~~~~~~ Funciones del home ~~~~~~~~~~~~~*/
function cargarDatos() {
  return fetch("json/juegos.json") //Devuelvo la lista filtrada, si es que la promesa no tiene erroes
    .then(res => res.json())
    .then(datosJuegos => datosJuegos.filter(juego => juego.activo))
    .catch(err => {
      console.error("Error:", err);
      return []; //Devuelvo una lista vacia si llega a haber un error
    });
}

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
        listCarrito.push(juego);
        localStorage.setItem("listCarrito", JSON.stringify(listCarrito));
        mostrarCantidadEnCarrito(listCarrito);
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

function mostrarCantidadEnCarrito(carrito){
  let cantidad = 0;

  carrito.forEach(juego =>{
    cantidad += 1;
  });
  btnCarrito.textContent = `🛒 Carrito: ${cantidad}`;
};

async function initCliente() {
  if (!divContenedorDatos){    
    return;
  }
  let datos = await cargarDatos();
  renderJuegos(datos);
}

initCliente();

/*====================================CARRITO DEL CLIENTE============================================*/

/*~~~~~~~~~~~~~ Etiquetas a usar del html~~~~~~~~~~~~~*/

const ulCarrito = document.getElementById("ul-carrito");

/*~~~~~~~~~~~~~ Funciones del carrito ~~~~~~~~~~~~~*/

function addCarrito(juego) {
    const liContenedor = document.createElement("div");
    liContenedor.className = "list-group-item d-flex flex-column flex-sm-row align-items-center m-1 gap-3";

    // Imagen del juego
    const imgJuego = document.createElement("img");
    imgJuego.src = "img/ghost.jpg"; // O juego.imagen si tenés ruta dinámica
    imgJuego.alt = `Juego de: ${juego.titulo}`;
    imgJuego.className = "rounded";
    imgJuego.style.width = "100px";
    imgJuego.style.height = "100px";
    imgJuego.style.objectFit = "cover";

    // Contenido del juego
    const divJuego = document.createElement("div");
    divJuego.className = "d-flex flex-column justify-content-center text-center text-sm-start";

    const tituloH3 = document.createElement("h3");
    tituloH3.innerText = `${juego.titulo}`;
    tituloH3.className = "fw-bold mb-1";

    const spanPrecio = document.createElement("span");
    spanPrecio.innerText = `Precio x ${juego.cantidad}: $${juego.precio}`;
    spanPrecio.className = "text-muted mb-2";

    const btnBorrar = document.createElement("button");
    btnBorrar.textContent = "🗑️ Borrar";
    btnBorrar.className = "btn btn-danger fw-bold rounded-pill px-3 py-1";

    btnBorrar.addEventListener("click", (event) => {
        event.preventDefault();
        listCarrito = listCarrito.filter(j => j !== juego);
        localStorage.setItem("carrito", JSON.stringify(listCarrito));
        renderCarrito(listCarrito);
    });

    divJuego.appendChild(tituloH3);
    divJuego.appendChild(spanPrecio);
    divJuego.appendChild(btnBorrar);

    liContenedor.appendChild(imgJuego);
    liContenedor.appendChild(divJuego);

    return liContenedor;
}



function renderCarrito(juegosEnCarrito){
    ulCarrito.innerHTML = "";
    juegosEnCarrito.forEach(juego => {
        ulCarrito.appendChild(addCarrito(juego));
    });
};

async function initCarrito() {
  if (!ulCarrito){    
    return;
  }
  console.log(listCarrito);
  renderCarrito(listCarrito);
}

initCarrito();