const divDeVentas = document.getElementById("ventas-container");
const bodyPagina = document.getElementsByClassName("body-pagina")[0];
const headerPagina = document.getElementsByClassName("barra-menu")[0];
const btnCambiarTema = document.getElementsByClassName("boton-tema-pagina")[0];
const textoVentas = document.getElementsByClassName("ventas-realizadas")[0];
const btnMostrarTodas = document.getElementById("btn-mostrar-todas");

let tema = localStorage.getItem("tema") || "oscuro";
let datos = window.ventasData || [];

window.addEventListener("DOMContentLoaded", () => {
  if (tema === "claro") {
    bodyPagina.classList.add("body-claro");
    headerPagina.classList.add("header-claro");
    textoVentas.classList.add("text-black");
  }
  cambiarTemaVentas();
});

btnCambiarTema.addEventListener("click", (event) => {
  event.preventDefault();
  const esClaro = bodyPagina.classList.contains("body-claro");

  bodyPagina.classList.toggle("body-claro", !esClaro);
  headerPagina.classList.toggle("header-claro", !esClaro);

  textoVentas.classList.toggle("text-black", !esClaro);
  
  tema = !esClaro ? "claro" : "oscuro";
  localStorage.setItem("tema", tema);
  cambiarTemaVentas();
});

btnMostrarTodas.addEventListener("click", () => {
  renderizarVentas(datos);
});

function cambiarTemaVentas(){
  const tarjetas = document.querySelectorAll(".tarjeta-venta");
  if(tema === "claro"){
    tarjetas.forEach(card => {
      card.classList.remove("bg-black", "text-white");
      card.classList.add("bg-light", "text-black");
    });
  } else {
    tarjetas.forEach(card => {
      card.classList.remove("bg-light", "text-black");
      card.classList.add("bg-black", "text-white");
    });
  }
}

function filtrarVentas() {
  const fechaSeleccionada = document.getElementById('fechaFiltro').value;
  
  const ventasFiltradas = datos.filter(venta => {
      const fechaVenta = new Date(venta.fecha).toISOString().split('T')[0]; //Para obtener solo la fecha
      return fechaVenta === fechaSeleccionada;
  });

  renderizarVentas(ventasFiltradas);
}

// Función para crear una card de venta dinámicamente (para filtros futuros)
function addVenta(venta){
  const divCard = document.createElement("div");
  divCard.className = "card p-3 mb-4 tarjeta-venta";

  const tituloVenta = document.createElement("h5");
  tituloVenta.className = "mb-2";
  tituloVenta.innerText = `Venta N° ${venta.id}`;

  const clienteTexto = document.createElement("p");
  clienteTexto.innerHTML = `<strong>Cliente: </strong> ${venta.nombre}`;

  const fechaTexto = document.createElement("p");
  const fechaParseada = new Date(venta.fecha).toISOString().slice(0, 10);
  fechaTexto.innerHTML = `<strong>Fecha: </strong> ${fechaParseada}`;

  const divTableResponsive = document.createElement("div");
  divTableResponsive.className = "table-responsive tarjeta-venta";

  // Crear tabla
  const tabla = document.createElement("table");
  tabla.className = "table table-bordered table-hover align-middle tarjeta-venta";

  // Encabezado de tabla
  const thead = document.createElement("thead");
  thead.className = "tarjeta-venta";
  thead.innerHTML = `
    <tr>
      <th class="tarjeta-venta">Juego</th>
      <th class="text-center tarjeta-venta">Cantidad</th>
      <th class="text-end tarjeta-venta">Precio Unitario</th>
      <th class="text-end tarjeta-venta">Subtotal</th>
    </tr>`;

  // Cuerpo de tabla
  const tbody = document.createElement("tbody");
  let total = 0;

  venta.productos.forEach(prod => {
    const fila = document.createElement("tr");

    const tdJuego = document.createElement("td");
    tdJuego.className = "tarjeta-venta";
    tdJuego.innerText = prod.titulo;

    const tdCantidad = document.createElement("td");
    tdCantidad.className = "text-center tarjeta-venta";
    tdCantidad.innerText = prod.cantidad;

    const tdPrecio = document.createElement("td");
    tdPrecio.className = "text-end tarjeta-venta";
    tdPrecio.innerText = `$${prod.precio}`;

    const subtotal = prod.cantidad * prod.precio;
    total += subtotal;

    const tdSubtotal = document.createElement("td");
    tdSubtotal.className = "text-end tarjeta-venta";
    tdSubtotal.innerText = `$${subtotal}`;

    fila.appendChild(tdJuego);
    fila.appendChild(tdCantidad);
    fila.appendChild(tdPrecio);
    fila.appendChild(tdSubtotal);

    tbody.appendChild(fila);
  });

  const totalTexto = document.createElement("div");
  totalTexto.className = "text-end fw-bold fs-5";
  totalTexto.innerText = `Total: $${total}`;

  tabla.appendChild(thead);
  tabla.appendChild(tbody);
  divTableResponsive.appendChild(tabla);

  divCard.appendChild(tituloVenta);
  divCard.appendChild(clienteTexto);
  divCard.appendChild(fechaTexto);
  divCard.appendChild(divTableResponsive);
  divCard.appendChild(totalTexto);

  return divCard;
}

// Función para renderizar ventas dinámicamente (para filtros futuros)
function renderizarVentas(datosVentas) {
  divDeVentas.innerHTML = "";

  if (datosVentas.length === 0) {
    divDeVentas.innerHTML = `
      <div class="text-center">
        <p class="text-white">No hay ventas registradas.</p>
      </div>
    `;
    return;
  }

  datosVentas.forEach(venta => {
    divDeVentas.appendChild(addVenta(venta));
  });
  cambiarTemaVentas();
}

// Inicialización - ya no necesitamos cargar datos desde el servidor
// porque vienen renderizados por EJS
cambiarTemaVentas();