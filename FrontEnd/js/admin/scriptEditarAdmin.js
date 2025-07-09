const bodyPagina = document.getElementsByClassName("body-pagina")[0];
const btnCambiarTema = document.getElementsByClassName("boton-tema-pagina")[0];
const headerPagina = document.getElementsByClassName("barra-menu")[0];

let tema = localStorage.getItem("tema") || "oscuro";
const params = new URLSearchParams(window.location.search);
const id = params.get('id');

window.addEventListener("DOMContentLoaded", () => { //"DOMContentLoaded" = Cuando este todo el html cargado.
  if (tema === "claro") {
    bodyPagina.classList.add("body-claro");
    headerPagina.classList.add("header-claro");
}});

if (id) {
  fetch(`/api/productos/${id}`)
    .then(res => res.json())
    .then(data => {
      const producto = data.data; 
      const listaCategorias = document.getElementById("listaCategorias");

      document.getElementById('nombreJuego').value = producto.titulo;
      document.getElementById('precioJuego').value = producto.precio;
      document.getElementById('descripcionJuego').value = producto.descripcion;

      let generos = [];

      // Asegurar que siempre sea un array
      if (Array.isArray(producto.genero)) {
        generos = producto.genero;
      }
      // } else if (typeof producto.genero === "string") {
      //   generos = [producto.genero]; // lo convierte en array
      // }

      generos.forEach(g => {
        const li = document.createElement("li");
        li.textContent = g;
        li.className = "list-group-item";
        listaCategorias.appendChild(li);
      });
    })
    .catch(err => {
      console.error('Error al cargar el producto. Error:', err);
      alert('No se pudo cargar el producto para editar');
    });
};

document.getElementById('formEdit').addEventListener('submit', async (e) => {
  e.preventDefault();

  const form = e.target;

  const producto = {
    titulo: form.nombreJuego.value,
    precio: parseFloat(form.precioJuego.value),
    descripcion: form.descripcionJuego.value
  };

  try {
    let url = '/api/productos';
    let methodProducto = 'POST';

    if (id) {
      url = `/api/productos/${id}`;
      methodProducto = 'PUT';
    }

    const response = await fetch(url, {
      method: methodProducto,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(producto)
    });

    const data = await response.json();

    if (response.ok) {
      alert("Juego guardado correctamente");
      form.reset();
      window.location.href = "/admin";
    } else {
      alert(data.error || 'Error al guardar el producto');
    }
  } catch (err) {
    console.error('Error:', err);
    alert('Ocurrió un error al enviar el formulario');
  }
});