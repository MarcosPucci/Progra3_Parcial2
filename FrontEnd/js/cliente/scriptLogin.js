const btnIngresar = document.getElementById("btn-ingresar");

btnIngresar.addEventListener("click", (event) =>{
    event.preventDefault();
    const nombreIngresadoCliente = document.getElementById("nombre-cliente").value.trim();
    if(nombreIngresadoCliente === ""){
        return;
    };
    localStorage.setItem("nombreCliente", nombreIngresadoCliente);
    window.location.href = "/home-cliente";
});