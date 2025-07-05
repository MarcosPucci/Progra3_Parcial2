
/*================================ Etiquetas html ======================================*/
const tbodyTable = document.getElementById("tbody-table");
const totalPagoHTML = document.getElementById("total-factura");
const fechaHoyHTML = document.getElementById("fecha-id");
const nombreClienteHTML = document.getElementById("nombre-cliente");
const btnSalir = document.getElementById("btn-salir");
const btnCamibarTema = document.getElementsByClassName("boton-tema-pagina")[0];

const bodyPagina = document.getElementsByClassName("body-pagina")[0];
const headerPagina = document.getElementsByClassName("barra-menu")[0];
const divFactura = document.getElementsByClassName("div-container-factura")[0];

/*================================ Variables a usar ======================================*/
let nombre = localStorage.getItem("nombreCliente");
let juegosComprados = JSON.parse(localStorage.getItem("listCarrito"));
const tema = localStorage.getItem("tema");

/*========================================================================================*/

window.addEventListener("DOMContentLoaded", () => { //"DOMContentLoaded" = Cuando este todo el html cargado.
  if (tema === "claro") {
    bodyPagina.classList.add("body-claro");
    headerPagina.classList.add("header-claro");
    divFactura.classList.add("bg-white");
  };
});

btnCamibarTema.addEventListener("click", (event) =>{
  event.preventDefault();
  const tarjetas = document.querySelectorAll(".tarjeta-juego");
  const tarjetasTexto = document.querySelectorAll(".tarjeta-texto");
  const esClaro = bodyPagina.classList.contains("body-claro");

  bodyPagina.classList.toggle("body-claro", !esClaro);
  headerPagina.classList.toggle("header-claro", !esClaro);
  divFactura.classList.toggle("bg-white", !esClaro);

  tarjetas.forEach(card => {
    card.classList.toggle("bg-black", esClaro);
    card.classList.toggle("bg-white", !esClaro);
  });

  tarjetasTexto.forEach(card => {
    card.classList.toggle("text-black", !esClaro);
    card.classList.toggle("text-white", esClaro);
  });
  localStorage.setItem("tema", !esClaro ? "claro" : "oscuro");
});

btnSalir.addEventListener("click", (event) =>{
    event.preventDefault();
    localStorage.removeItem("nombreCliente");
    window.location.href = "/";
});

function cambiarTemaDeTarjetas(){
    const tarjetas = document.querySelectorAll(".tarjeta-juego");
    const tarjetasTexto = document.querySelectorAll(".tarjeta-texto");

    tarjetas.forEach(card => {
        card.classList.remove("bg-black","bg-light");

        if (tema === "oscuro") {
            card.classList.add("bg-black");
        } else {
            card.classList.add("bg-white");
        };
  });
  tarjetasTexto.forEach(card => {
        card.classList.remove("text-black","text-white");

        if (tema === "oscuro") {
        card.classList.add("text-white");
        } else {
        card.classList.add("text-black");
        };
  });
};

function insertarDatosCompra(juego){
    const trTable = document.createElement("tr");
    trTable.className = "";

    const tdTableNombreJuego = document.createElement("td");
    tdTableNombreJuego.className = "tarjeta-juego tarjeta-texto";
    tdTableNombreJuego.innerText = juego.titulo;

    const tdTableCantidadJuego = document.createElement("td");
    tdTableCantidadJuego.className = "tarjeta-juego tarjeta-texto";
    tdTableCantidadJuego.innerText = juego.cantidad;

    const tdTablePrecioJuego = document.createElement("td");
    tdTablePrecioJuego.className = "tarjeta-juego tarjeta-texto";
    tdTablePrecioJuego.innerText = "$" + juego.precio * juego.cantidad;

    trTable.appendChild(tdTableNombreJuego);
    trTable.appendChild(tdTableCantidadJuego);
    trTable.appendChild(tdTablePrecioJuego);

    return trTable;
};

function renderFacturaCompra(){
    tbodyTable.innerHTML = "";
    juegosComprados.forEach(juego => {
        tbodyTable.appendChild(insertarDatosCompra(juego));
    });
    cambiarTemaDeTarjetas();
};

function calcularTotal(){
    let total = 0;
    juegosComprados.forEach(j =>{
        total += j.precio * j.cantidad;
    });
    return total;
};

function init(){
    fechaHoyHTML.innerText = "Fecha: " + new Date().toLocaleDateString();
    nombreClienteHTML.innerHTML = "Factura a nombre de: " + localStorage.getItem("nombreCliente");
    renderFacturaCompra();
    totalPagoHTML.innerText = `Total de la compra: $${calcularTotal()}`;
    localStorage.removeItem("listCarrito");
};

init();