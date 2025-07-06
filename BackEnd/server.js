import express from "express"
import path from "path"
import url from "url"
import cors from "cors"
import session from "express-session"
import sequelize from "./config/db-sequelize.js";
import envs from "./config/envs.js";

// Imports de las rutas
import productRoutes from "./routes/products.route.js"
import salesRoutes from "./routes/sales.route.js"
import authRoutes from "./routes/auth.route.js"

//Inicio de servidor
const app = express()

//Rutas
const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

//Config
app.set('PORT', envs.port || 3000)

const incializeConnection = async () => {
  try {
    await sequelize.sync()
    console.log("Database synchronized");
  } catch(err) {
    console.error(err);
  }
}

//Middlewares
app.use(cors()) //Permite peticiones desde otros dominios (asi no tira error)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))



// Servir archivos estáticos (HTML, CSS, JS, imágenes)
// Todo lo que esté en la carpeta 'FrontEnd' será accesible desde el navegador
app.use(express.static(path.join(__dirname,'..', 'FrontEnd')));


// RUTAS DE LA API (para que el frontend pueda obtener/enviar datos)
app.use("/api/products", productRoutes) // Rutas para productos
app.use("/api", salesRoutes) // Rutas para ventas
app.use("/api/auth", authRoutes) // Rutas para autenticación

// RUTAS PARA CLIENTES (página principal)
app.get("/", (req, res) => {
  // Esta es la página que ven los CLIENTES en el autoservicio
  res.sendFile(path.join(__dirname, "..","FrontEnd", "htmlCliente", "inicioCliente.html"))
})

app.get("/homeCliente", (req, res) => {
  // Ruta directa para acceder a homeCliente.html
  res.sendFile(path.join(__dirname, "..","FrontEnd", "htmlCliente", "homeCliente.html"))
})

app.get("/home-cliente", (req, res) => {
  // Ruta alternativa con guión para acceder a homeCliente.html
  res.sendFile(path.join(__dirname, "..","FrontEnd", "htmlCliente", "homeCliente.html"))
})

app.get("/carritoCliente", (req, res) => {
  // Ruta directa para acceder a carrito.html
  res.sendFile(path.join(__dirname, "..","FrontEnd", "htmlCliente", "carrito.html"))
})

app.get("/ticketCliente", (req, res) => {
  // Ruta para mostrar el ticket de la venta
  res.sendFile(path.join(__dirname, "..","FrontEnd", "htmlCliente", "facturaCliente.html"))
})

// RUTAS PARA ADMIN
app.get("/login-admin", (req, res) => {
  // Ruta para el login del admin
  res.sendFile(path.join(__dirname, "..","FrontEnd", "ejsAdmin", "loginAdmin.ejs"))
})

//RECORDATORIO: Faltan rutas del admin

// MIDDLEWARE PARA MANEJAR RUTAS NO ENCONTRADAS
app.use("/*splat", (req, res) => { //*splat para cuando no se encuntra una ruta.
    res.status(404).send(`
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>404 - Página no encontrada</title>
            <style>
                body { font-family: sans-serif; display: flex; flex-direction: column; justify-content: center; align-items: center; min-height: 100vh; color: white; text-align: center; background-color: black;}
                h1 { font-size: 3em; margin-bottom: 0.5em; }
                p { font-size: 1.2em; margin-bottom: 1em; }
                a { color:rgb(243, 105, 20); text-decoration: none; font-weight: bold; }
                a:hover { text-decoration: underline; }
            </style>
        </head>
        <body>
            <h1>Página no encontrada</h1>
            <p>Lo sentimos, la ruta <strong>${req.originalUrl}</strong> no existe en el servidor.</p>
            <a href="/">Volver al inicio</a>
        </body>
        </html>
    `);
});

//Listeners
incializeConnection()

app.listen(app.get("PORT"), () => {
  console.log(`Servidor corriendo en http://localhost:${app.get("PORT")}`)
  console.log(`Interfaz Cliente: http://localhost:${app.get("PORT")}/`)
})

