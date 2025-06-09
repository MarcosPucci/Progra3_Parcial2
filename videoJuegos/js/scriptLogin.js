const inputNombre = document.getElementById("nombreCliente");
const btnIngresar = document.getElementById("btn-ingresar");

let nombreUsuario = "";

btnIngresar.addEventListener("click", () =>{
    nombreUsuario = inputNombre.value;
    window.location.href = "homeCliente.html";
});

export function obtenerNombre(){
    return nombreUsuario;
};