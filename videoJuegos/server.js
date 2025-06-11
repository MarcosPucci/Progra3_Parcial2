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
app.set('PORT', 500)

//Middlewares
app.use(cors()) //Permite peticiones desde otros dominios (asi no tira error)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Servir archivos estáticos (HTML, CSS, JS, imágenes)
// Todo lo que esté en la carpeta 'public' será accesible desde el navegador
app.use(express.static(path.join(__dirname, 'public')))


// RUTAS DE LA API (para que el frontend pueda obtener/enviar datos)
//app.use("/api/products", productRoutes) // Rutas para productos
/* app.use("/api/sales", salesRoutes) */ // Rutas para ventas
/* app.use("/api/auth", authRoutes) */ // Rutas para autenticación


// RUTAS PARA CLIENTES (página principal)
app.get("/", (req, res) => {
  // Esta es la página que ven los CLIENTES en el autoservicio
  res.sendFile(path.join(__dirname, "public", "cliente", "index.html"))
})

//RECORDATORIO: Faltan rutas del admin

// MIDDLEWARE PARA MANEJAR RUTAS NO ENCONTRADAS
/* app.use("*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "public", "404.html"))
}) */

app.listen(app.get("PORT"), () => {
  console.log(`Servidor corriendo en http://localhost:${app.get("PORT")}`)
  //console.log(`Interfaz Cliente: http://localhost:${app.get("PORT")}/`)
})

