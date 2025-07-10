const divDeVentas = document.getElementById("ventas-container");


function cargarDatosVentas() {
  return fetch("/api/ventas")
    .then(res => res.json())
    .then(res => res.data)
    .catch(err => {
      console.error("Error:", err);
      return [];
    });
};

function addVenta(venta){
  const divCard = document.createElement("div");
  divCard.className = "card p-3 mb-4";

  const tituloVenta = document.createElement("h5");
  tituloVenta.className = "mb-2";
  tituloVenta.innerText = `Venta N° ${venta.id}`;

  const clienteTexto = document.createElement("p");
  clienteTexto.innerHTML = `<strong>Cliente: </strong> ${venta.nombre}`;

  const fechaTexto = document.createElement("p");
  const fechaParseada = new Date(venta.fecha).toISOString().slice(0, 10);
  fechaTexto.innerHTML = `<strong>Fecha: </strong> ${fechaParseada}`;

  const divTableResponsive = document.createElement("div");
  divTableResponsive.className = "table-responsive";

  // Crear tabla
  const tabla = document.createElement("table");
  tabla.className = "table table-bordered table-hover align-middle";

  // Encabezado de tabla
  const thead = document.createElement("thead");
  thead.className = "table-light";
  thead.innerHTML = `
    <tr>
      <th>Juego</th>
      <th class="text-center">Cantidad</th>
      <th class="text-end">Precio Unitario</th>
      <th class="text-end">Subtotal</th>
    </tr>`;

  // Cuerpo de tabla
  const tbody = document.createElement("tbody");
  let total = 0;

  venta.productos.forEach(prod => {
    const fila = document.createElement("tr");

    const tdJuego = document.createElement("td");
    tdJuego.innerText = prod.titulo;

    const tdCantidad = document.createElement("td");
    tdCantidad.className = "text-center";
    tdCantidad.innerText = prod.cantidad;

    const tdPrecio = document.createElement("td");
    tdPrecio.className = "text-end";
    tdPrecio.innerText = `$${prod.precio}`;

    const subtotal = prod.cantidad * prod.precio;
    total += subtotal;

    const tdSubtotal = document.createElement("td");
    tdSubtotal.className = "text-end";
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
};

function renderizarVentas(datosVentas) {
  divDeVentas.innerHTML = "";

  datosVentas.forEach(venta => {
    divDeVentas.appendChild(addVenta(venta));
  });
};

async function initVentas() {
  let datosDeVentas = await cargarDatosVentas();
  renderizarVentas(datosDeVentas);
};

initVentas();