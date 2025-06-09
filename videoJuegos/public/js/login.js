document.addEventListener('DOMContentLoaded', () => {

    const formLogin = document.getElementById('form-login')
    const nombreInput = document.getElementById('nombre')
    
    formLogin.addEventListener('submit', (e) => {
        e.preventDefault()
    
        const username = nombreInput.value.trim()
    
        if (username) {
            localStorage.setItem('username', username)
    
            window.location.href = 'homeCliente.html'
        } else {
            
            alert('Por favor, ingresa tu nombre')
        }
    
    
    })


})


