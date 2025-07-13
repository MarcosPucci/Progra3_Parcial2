const bodyPagina = document.getElementsByClassName("body-pagina")[0];
const btnCambiarTema = document.getElementsByClassName("boton-tema-pagina")[0];
const headerPagina = document.getElementsByClassName("barra-menu")[0];
const btnAgregarGenero = document.getElementById("btnAgregarCategoria");
const listaCategorias = document.getElementById("listaCategorias");

let tema = localStorage.getItem("tema") || "oscuro";
const params = new URLSearchParams(window.location.search);
const id = params.get('id');
let generoJuego = [];

window.addEventListener("DOMContentLoaded", () => { //"DOMContentLoaded" = Cuando este todo el html cargado.
  const tema = localStorage.getItem("tema");
  if (tema === "claro") {
    bodyPagina.classList.add("body-claro");
    headerPagina.classList.add("header-claro");
  }
  else{
    bodyPagina.classList.remove("body-claro");
    headerPagina.classList.remove("header-claro");
  }
});

btnCambiarTema.addEventListener("click", (event) => {
  event.preventDefault();
  const textos = document.querySelectorAll(".tarjeta-juego");
  const esClaro = bodyPagina.classList.contains("body-claro");

  bodyPagina.classList.toggle("body-claro", !esClaro);
  headerPagina.classList.toggle("header-claro", !esClaro);

  textos.forEach(texto => {
    texto.classList.toggle("bg-black", esClaro);
    texto.classList.toggle("text-white", esClaro);
    texto.classList.toggle("bg-light", !esClaro);
    texto.classList.toggle("text-black", !esClaro);
  });
  tema = !esClaro ? "claro" : "oscuro";
  localStorage.setItem("tema", tema);
});

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

if (id) {
  fetch(`/api/productos/${id}`)
    .then(res => res.json())
    .then(data => {
      const producto = data.data; 

      document.getElementById('nombreJuego').value = producto.titulo;
      document.getElementById('precioJuego').value = producto.precio;
      document.getElementById('descripcionJuego').value = producto.descripcion;
      document.getElementById("categoriaJuego").value = producto.categoria;

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
  const formData = new FormData();

  formData.append('titulo', form.nombreJuego.value);
  formData.append('genero', JSON.stringify(generoJuego));
  formData.append('precio', parseFloat(form.precioJuego.value));
  formData.append('descripcion', form.descripcionJuego.value);
  formData.append('categoria', form.categoriaJuego.value);

  const inputImagen = document.getElementById("imagenJuego");
  
  if (inputImagen.files.length > 0) {
    formData.append('imagen', inputImagen.files[0]);
  } else if (id) {
    const productoViejo = await fetch(`/api/productos/${id}`).then(r => r.json());
    formData.append('img', productoViejo.data.img);
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
      body: formData
    });

    const data = await response.json();

    if (response.ok) {
      alert("Juego guardado correctamente");
      form.reset();
      window.location.href = "/admin";
    } else {
      alert(data.message || 'Error al guardar el producto');
    }
  } catch (err) {
    console.error('Error:', err);
    alert('Ocurrió un error al enviar el formulario');
  }
});