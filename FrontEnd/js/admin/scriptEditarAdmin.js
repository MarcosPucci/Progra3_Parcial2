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
      document.getElementById('nombreJuego').value = data.titulo;
      document.getElementById('precioJuego').value = data.precio;
      document.getElementById('descripcionJuego').value = data.descripcion;
    })
    .catch(err => {
      console.error('Error al cargar el producto. Error:', err);
      alert('No se pudo cargar el producto para editar');
    });
};

document.getElementById('formEdit').addEventListener('submit', async (e) => {
  e.preventDefault();

  const form = e.target; // El formulario completo
  const formData = new FormData(form); // Crea objeto FormData con todos los datos del form

  try {
    let url = '/api/productos';
    let methodProducto = 'POST';

    if (id) {
      url = `/api/productos/${id}`;
      methodProducto = 'PUT';
    }
    const response = await fetch(url, {
      method: methodProducto,
      body: formData
    });

    if (response.ok) {
      const data = await response.json();
      alert(data.mensaje);
      form.reset();
    } else {
      const errorData = await response.json();
      alert(errorData.error || 'Error al guardar el producto');
    }
  } catch (err) {
    console.error('Error:', err);
    alert('Ocurrió un error al enviar el formulario');
  }
});
