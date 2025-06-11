const inputNombre = document.getElementById("nombreCliente");
const btnIngresar = document.getElementById("btn-ingresar");

let nombreUsuario = "";

btnIngresar.addEventListener("click", () =>{
    nombreUsuario = inputNombre.value.trim();
    if(!verificarNombreIngresado(nombre)){
        nombreUsuario = "Usuario anonimo";
    };
    window.location.href = "homeCliente.html";
});

function verificarNombreIngresado(nombre){
    if(nombre != ""){
        return true;
    }
    return false;
};

export function obtenerNombre(){
    return nombreUsuario;
};