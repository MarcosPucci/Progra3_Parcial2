const form = document.getElementById('form-login');

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
        } else {
        // document.getElementById('error-message').innerText = data.message || 'Error en login';
        // document.getElementById('error-message').style.display = 'block';
        }
    } catch (err) {
        console.error(err);
        // document.getElementById('error-message').innerText = 'Error del servidor';
        // document.getElementById('error-message').style.display = 'block';
    }
});