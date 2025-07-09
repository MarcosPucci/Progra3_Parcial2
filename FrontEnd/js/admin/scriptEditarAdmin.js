const bodyPagina = document.getElementsByClassName("body-pagina")[0];
const btnCambiarTema = document.getElementsByClassName("boton-tema-pagina")[0];
const headerPagina = document.getElementsByClassName("barra-menu")[0];
const btnAgregarGenero = document.getElementById("btnAgregarCategoria");
const listaCategorias = document.getElementById("listaCategorias");

btnAgregarGenero.addEventListener("click", (e) =>{
  e.preventDefault();
  if(document.getElementById("generoInput").value != ""){
    const li = document.createElement("li");
    li.textContent = document.getElementById("generoInput").value;
    generoJuego.push(document.getElementById("generoInput").value);
    document.getElementById("generoInput").value = "";
    li.className = "list-group-item d-flex justify-content-between align-items-center";
  
    const btnEliminar = document.createElement("button");
    btnEliminar.className = "btn btn-sm btn-danger";
    btnEliminar.textContent = "Eliminar";
    btnEliminar.addEventListener("click", (e) =>{
      e.preventDefault();
      generoJuego.splice(1);
      li.remove();
    });
  
    li.appendChild(btnEliminar);
    listaCategorias.appendChild(li);
  }
  else{
    alert("No ingresó ningun genero")
  };
});

let tema = localStorage.getItem("tema") || "oscuro";
const params = new URLSearchParams(window.location.search);
const id = params.get('id');
let generoJuego = [];

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

      document.getElementById('nombreJuego').value = producto.titulo;
      document.getElementById('precioJuego').value = producto.precio;
      document.getElementById('descripcionJuego').value = producto.descripcion;
      document.getElementById("categoriaJuego").value = producto.categoria;
      console.log(producto.categoria);
      

      generoJuego = JSON.parse(producto.genero);

      generoJuego.forEach((g, index) => {
        const li = document.createElement("li");
        li.textContent = g;
        li.className = "list-group-item d-flex justify-content-between align-items-center";

        const btnEliminar = document.createElement("button");
        btnEliminar.className = "btn btn-sm btn-danger";
        btnEliminar.textContent = "Eliminar";

        btnEliminar.addEventListener("click", (e) =>{
          e.preventDefault();
          generoJuego.splice(index, 1);
          li.remove();
        });

        li.appendChild(btnEliminar);
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
    genero: JSON.stringify(generoJuego),
    precio: parseFloat(form.precioJuego.value),
    descripcion: form.descripcionJuego.value,
    categoria: form.categoriaJuego.value,
    img: ""
  };

  const inputImagen = document.getElementById("imagenJuego");

  if (inputImagen.files.length > 0) {
    producto.img = inputImagen.files[0].name;
  } else if (id) {
  const productoViejo = await fetch(`/api/productos/${id}`).then(r => r.json());
  producto.img = productoViejo.data.img;
}

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