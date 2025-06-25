const btnAgregar = document.getElementById("btn-guardar-cambios");


btnAgregar.addEventListener("click", (event) =>{
    event.preventDefault();

    const imagen = document.getElementById("imagenJuego").value;
    const nombre = document.getElementById("nombreJuego").value;
    const precio = document.getElementById("precioJuego").value;
    const descripcion = document.getElementById("descripcionJuego").value;

});

fetch("/static/json/juegos.json")
  .then(res => res.json())
  .then(productos => {
    const producto = productos.find(j => j.id == id);
    if (producto) {
        document.getElementById("imagenJuego").value = producto.img;
        document.getElementById("nombreJuego").value = producto.titulo;
        document.getElementById("precioJuego").value = producto.precio;
        document.getElementById("descripcionJuego").value = producto.descripcion;
    };
  });