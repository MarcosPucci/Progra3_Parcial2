/*====================================CARRITO DEL CLIENTE============================================*/

/*~~~~~~~~~~~~~ Etiquetas a usar del html ~~~~~~~~~~~~~*/

const ulCarrito = document.getElementById("ul-carrito");
const btnCarrito = document.getElementById("btn-carrito");
const totalPagar = document.getElementById("total-pagar");
const btnFinalizarCompra = document.getElementById("btn-finalizar-compra");
const btnCamibarTema = document.getElementsByClassName("boton-tema-pagina")[0];

const bodyPagina = document.getElementsByClassName("body-pagina")[0];
const headerPagina = document.getElementsByClassName("barra-menu")[0];


/*~~~~~~~~~~~~~ Variables a usar ~~~~~~~~~~~~~*/

let listCarrito = JSON.parse(localStorage.getItem("listCarrito")) || [];
let tema = localStorage.getItem("tema") || "oscuro";

/*~~~~~~~~~~~~~ Funciones del carrito ~~~~~~~~~~~~~*/

window.addEventListener("DOMContentLoaded", () => { //"DOMContentLoaded" = Cuando este todo el html cargado.
  if (tema === "claro") {
    bodyPagina.classList.add("body-claro");
    headerPagina.classList.add("header-claro");
  };
});

btnCamibarTema.addEventListener("click", (event) =>{
  event.preventDefault();
  const tarjetas = document.querySelectorAll(".tarjeta-juego");
  const esClaro = bodyPagina.classList.contains("body-claro");

  bodyPagina.classList.toggle("body-claro", !esClaro);
  headerPagina.classList.toggle("header-claro", !esClaro);

  tarjetas.forEach(card => {
    card.classList.toggle("bg-black", esClaro);
    card.classList.toggle("text-white", esClaro);
    card.classList.toggle("bg-light", !esClaro);
    card.classList.toggle("text-black", !esClaro);
  });
  tema = !esClaro ? "claro" : "oscuro";
  localStorage.setItem("tema", tema);
});

btnFinalizarCompra.addEventListener("click", async (event) =>{
  event.preventDefault();
  if(listCarrito.length > 0){
    const respuesta = await mostrarModalConfirmacion();

    if (respuesta) {
      const datosCompra = {nombre: localStorage.getItem("nombreCliente"), productos: listCarrito};
      fetch('/api/finalizarCompra', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datosCompra)
      })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        
        const ventaId = data.id; // ID de la venta guardada en la base
        window.location.href = `/ticketCliente?venta=${ventaId}`; //Mando al usuario a la pantalla del ticket con su ID
      });
    };
  }else{
    alert("No ingresó ningun producto.")
  }});

function mostrarModalConfirmacion() {
  return new Promise((resolve) => {
    const modal = document.getElementById("miModal");
    modal.classList.remove("d-none");

    const btnConfirmar = modal.querySelector("#btn-confirmar");
    const btnCancelar = modal.querySelector("#btn-cancelar");

    btnConfirmar.onclick = () => {
      modal.classList.add("d-none");
      resolve(true);
    };

    btnCancelar.onclick = () => {
      modal.classList.add("d-none");
      resolve(false);
    };
  });
};

function cambiarTemaDeTarjetas(){
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

function addCarrito(juego) {
    const liContenedor = document.createElement("div");
    liContenedor.className = "list-group-item d-flex flex-column flex-sm-row align-items-center m-1 gap-3 tarjeta-juego";

    const imgJuego = document.createElement("img");
    imgJuego.src = `/static/${juego.img}`;
    imgJuego.alt = `Juego de: ${juego.titulo}`;
    imgJuego.className = "rounded";
    imgJuego.style.width = "100px";
    imgJuego.style.height = "100px";
    imgJuego.style.objectFit = "cover";

    const divJuego = document.createElement("div");
    divJuego.className = "d-flex flex-column justify-content-center text-center text-sm-start";

    const tituloH3 = document.createElement("h3");
    tituloH3.innerText = `${juego.titulo}`;
    tituloH3.className = "fw-bold mb-1";

    const spanPrecio = document.createElement("span");
    spanPrecio.innerText = `Precio x ${juego.cantidad}: $${(juego.precio * juego.cantidad)}`;
    spanPrecio.className = "text-white mb-2 tarjeta-juego";

    const btnBorrar = document.createElement("button");
    btnBorrar.textContent = "🗑️ Borrar";
    btnBorrar.className = "btn btn-danger fw-bold rounded-pill px-3 py-1";

    btnBorrar.addEventListener("click", (event) => {
        event.preventDefault();

        listCarrito = listCarrito.filter(j => !(j.id === juego.id && j.categoria === juego.categoria));      
        localStorage.setItem("listCarrito", JSON.stringify(listCarrito));

        renderCarrito(listCarrito);
    });

    const inputCantidad = document.createElement("input");
    inputCantidad.type = "number";
    inputCantidad.min = "1";
    inputCantidad.value = juego.cantidad;
    inputCantidad.className = "form-control my-2 text-center";
    
    inputCantidad.addEventListener("change", () => {
        const nuevaCantidad = parseInt(inputCantidad.value);
        if (nuevaCantidad > 0) {
            juego.cantidad = nuevaCantidad;
            localStorage.setItem("listCarrito", JSON.stringify(listCarrito));
            renderCarrito(listCarrito);
            mostrarCantidadEnCarrito();
        };
    });
    inputCantidad.addEventListener("keyup", () =>{
      if(inputCantidad.value === 0){
        inputCantidad.value = 1;
        juego.cantidad = parseInt(inputCantidad.value);
        localStorage.setItem("listCarrito", JSON.stringify(listCarrito));
        renderCarrito(listCarrito);
        mostrarCantidadEnCarrito()
      };
    });
    inputCantidad.addEventListener("blur", () =>{
      if(inputCantidad.value === "" || inputCantidad.value === "0"){
        inputCantidad.value = 1;
        juego.cantidad = parseInt(inputCantidad.value);
        localStorage.setItem("listCarrito", JSON.stringify(listCarrito));
        renderCarrito(listCarrito);
        mostrarCantidadEnCarrito()
      };
    });

    divJuego.appendChild(tituloH3);
    divJuego.appendChild(spanPrecio);
    divJuego.appendChild(inputCantidad);
    divJuego.appendChild(btnBorrar);

    liContenedor.appendChild(imgJuego);
    liContenedor.appendChild(divJuego);

    return liContenedor;
};

function renderCarrito(juegosEnCarrito){
    ulCarrito.innerHTML = "";
    juegosEnCarrito.forEach(juego => {
        ulCarrito.appendChild(addCarrito(juego));
    });
    mostrarCantidadEnCarrito();
    totalPagar.innerHTML = "";
    totalPagar.innerHTML = mostrarTotalPagar()
    cambiarTemaDeTarjetas();
};

function mostrarCantidadEnCarrito(){
  let cantidad = 0;

  listCarrito.forEach(juego =>{
    cantidad += juego.cantidad;
  });
  btnCarrito.textContent = `🛒 Carrito: ${cantidad}`;
};

function mostrarTotalPagar(){
    let total = 0;
    listCarrito.forEach(j =>{
        total += (j.precio * j.cantidad);
    });
    return total;
};

function initCarrito() {
  mostrarCantidadEnCarrito();
  if (!ulCarrito){    
    return;
  };
  renderCarrito(listCarrito);
};

initCarrito();