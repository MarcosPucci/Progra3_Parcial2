const express = require('express');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, '../FrontEnd')));

// Simulamos una "base de datos"
const usuarios = [
  { email: 'admin@admin.com', password: '1234' },
  { email: 'cliente@cliente.com', password: '5678' }
];

// Mostrar el formulario de login
app.get('/', (req, res) => {
  res.render('loginAdmin.ejs', { error: null });
});

// Procesar el login
app.post('/loginAdmin.ejs', (req, res) => {
  const { email, password } = req.body;
  const usuario = usuarios.find(u => u.email === email && u.password === password);

  if (usuario) {
    // Login exitoso → redirigir al home
    // res.render('/FrontEnd/htmlCliente/homeCliente.html', { email: usuario.email });
    res.render('loginAdmin.ejs', {f: 'Email y contraseña CORRECTOS'});
  } else {
    // Login incorrecto → mostrar error
    res.render('loginAdmin.ejs', { error: 'Email o contraseña incorrectos' });
  }
});

app.listen(3000, () => {
  console.log('Servidor en http://localhost:3000');
});
