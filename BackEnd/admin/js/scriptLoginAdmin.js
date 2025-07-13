const form = document.getElementById('form-login');
const btnTemaClaro = document.getElementsByClassName("boton-tema-pagina")[0];
const bodyPagina = document.getElementsByClassName("body-pagina")[0];
const textoLogin =  Array.from(document.getElementsByClassName("texto-login"));

let tema = localStorage.getItem("tema") || "oscuro";

window.addEventListener("DOMContentLoaded", () => { //"DOMContentLoaded" = Cuando este todo el html cargado.
  if (tema === "claro") {
  
    bodyPagina.classList.add("body-claro");

    textoLogin.forEach(texto => {
        texto.classList.add("text-black");
    });
}});

btnTemaClaro.addEventListener("click", (event) =>{
  event.preventDefault();
  
  const esClaro = bodyPagina.classList.contains("body-claro");

  bodyPagina.classList.toggle("body-claro", !esClaro);

  textoLogin.forEach(texto => {
    texto.classList.toggle("text-white", esClaro);
    texto.classList.toggle("text-black", !esClaro);
  });

  tema = !esClaro ? "claro" : "oscuro";
  localStorage.setItem("tema", tema);
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            window.location.href = '/admin';
        }
    } catch (err) {
        console.error(err);
    }
});