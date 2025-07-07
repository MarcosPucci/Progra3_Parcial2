const btnIngresar = document.getElementById("btn-ingresar");
const btnCambiarTema = document.getElementsByClassName("boton-tema-pagina")[0];
const bodyPagina = document.getElementsByClassName("body-pagina")[0];
const textAlumnos = document.getElementById("text-alumnos");
const textTitulo = document.getElementsByClassName("text-titulo")[0];

let tema = localStorage.getItem("tema") || "oscuro";

// Aplica el tema guardado al cargar la página
window.addEventListener("DOMContentLoaded", () => {
  if (tema === "claro") {
    bodyPagina.classList.add("body-claro");
    textAlumnos.classList.add("text-black");
    textTitulo.classList.add("text-black");
  } else {
    bodyPagina.classList.remove("body-claro"); // por si quedó aplicado antes
    textAlumnos.classList.remove("text-black");
    textTitulo.classList.remove("text-black");
  }
});

// Cambia el tema al hacer clic
btnCambiarTema.addEventListener("click", (event) => {
  event.preventDefault();
  const esClaro = bodyPagina.classList.contains("body-claro");

  bodyPagina.classList.toggle("body-claro", !esClaro);
  bodyPagina.classList.toggle("text-black", !esClaro);
  textTitulo.classList.toggle("text-black", !esClaro);
  tema = !esClaro ? "claro" : "oscuro";
  localStorage.setItem("tema", tema);
});


btnIngresar.addEventListener("click", (event) =>{
    event.preventDefault();
    const nombreIngresadoCliente = document.getElementById("nombre-cliente").value.trim();
    if(nombreIngresadoCliente === ""){
        return;
    };
    localStorage.setItem("nombreCliente", nombreIngresadoCliente);
    window.location.href = "/homeCliente";
});
