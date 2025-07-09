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
    divCard.className = "card p-3";

    const textoIdVenta = document.createElement("h5");
    textoIdVenta.className = "mb-2";
    textoIdVenta.innerText = `Venta N°:${venta.id}`;

    const textoCliente = document.createElement("strong");
    textoCliente.innerText = `Cliente:`;

    const nombreCliente = document.createElement("p");
    nombreCliente.innerText = `${venta.cliente}`;
};