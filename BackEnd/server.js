import express from "express"
import path from "path"
import url from "url"
import cors from "cors"

// Imports de las rutas
import productRoutes from "./routes/products.route.js"
/* import salesRoutes from "./routes/sales.route.js" */
//import authRoutes from "./routes/auth.route.js" -> crear modulo de atentificacion admins


//Inicio de servidor
const app = express()

//Rutas
const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

//Config
app.set('PORT', 5000)

//Middlewares
app.use(cors()) //Permite peticiones desde otros dominios (asi no tira error)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Servir archivos estáticos (HTML, CSS, JS, imágenes)
// Todo lo que esté en la carpeta 'public' será accesible desde el navegador
app.use(express.static(path.join(__dirname,'..', 'frontend')));


// RUTAS DE LA API (para que el frontend pueda obtener/enviar datos)
app.use("/api/products", productRoutes) // Rutas para productos
/* app.use("/api/sales", salesRoutes) */ // Rutas para ventas
/* app.use("/api/auth", authRoutes) */ // Rutas para autenticación


// RUTAS PARA CLIENTES (página principal)
app.get("/", (req, res) => {
  // Esta es la página que ven los CLIENTES en el autoservicio
  res.sendFile(path.join(__dirname, "..","frontend", "htmlCliente", "inicioCliente.html"))
})

app.get("/home-cliente", (req, res) => {
  // Esta es la página que ven los CLIENTES en el autoservicio
  res.sendFile(path.join(__dirname, "..","frontend", "htmlCliente", "homeCliente.html"))
})

app.get("/carrito-cliente", (req, res) => {
  // Esta es la página que ven los CLIENTES en el autoservicio
  res.sendFile(path.join(__dirname, "..","frontend", "htmlCliente", "carrito.html"))
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

app.listen(app.get("PORT"), () => {
  console.log(`Servidor corriendo en http://localhost:${app.get("PORT")}`)
  console.log(`Interfaz Cliente: http://localhost:${app.get("PORT")}/`)
})

