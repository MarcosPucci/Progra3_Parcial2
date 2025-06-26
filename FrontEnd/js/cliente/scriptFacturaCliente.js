/*================================ Etiquetas html ======================================*/
const tbodyTable = document.getElementById("tbody-table");
const totalPagoHTML = document.getElementById("total-factura");
const fechaHoyHTML = document.getElementById("fecha-id");
const nombreClienteHTML = document.getElementById("nombre-cliente");

/*================================ Variables a usar ======================================*/
let nombre = localStorage.getItem("nombreCliente");
let juegosComprados = JSON.parse(localStorage.getItem("listCarrito"));

function insertarDatosCompra(juego){
    const trTable = document.createElement("tr");

    const tdTableNombreJuego = document.createElement("td");
    tdTableNombreJuego.innerText = juego.titulo;

    const tdTableCantidadJuego = document.createElement("td");
    tdTableCantidadJuego.innerText = juego.cantidad;

    const tdTablePrecioJuego = document.createElement("td");
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
    totalPagoHTML.innerText = `Total a pagar: $${calcularTotal()}`;
    localStorage.removeItem("listCarrito");
};

init();