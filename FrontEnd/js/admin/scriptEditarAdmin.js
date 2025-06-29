const params = new URLSearchParams(window.location.search);
const id = params.get('id');

if (id) {
  fetch(`/api/productos/${id}`)
    .then(res => res.json())
    .then(data => {
      document.getElementById('nombreJuego').value = data.titulo;
      document.getElementById('precioJuego').value = data.precio;
      document.getElementById('descripcionJuego').value = data.descripcion;
    })
    .catch(err => {
      console.error('Error al cargar el producto:', err);
      alert('No se pudo cargar el producto para editar');
    });
}

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
