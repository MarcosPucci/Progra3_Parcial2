import express from "express"
import path from "path"
import url from "url"
import cors from "cors"
import sequelize from "./config/db-sequelize.js";
import envs from "./config/envs.js";

// Imports de las rutas
import productRoutes from "./routes/products.route.js"
import salesRoutes from "./routes/sales.route.js"
import clientRoutes from "./routes/client.route.js"

//Inicio de servidor
const app = express()

//Rutas
const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

//Config
app.set('PORT', envs.portCliente || 3000)

//Metodo para conectar a la base de datos
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
app.use(express.json()) //Permite que el servidor entienda los datos en formato JSON
app.use(express.urlencoded({ extended: true })) //Permite que el servidor entienda los datos de formularios

// Servir archivos estáticos del cliente (públicos)
app.use(express.static(path.join(__dirname, 'public')));

// Configuración específica para /static/ - mapea /static/ a la carpeta public
app.use('/static', express.static(path.join(__dirname, 'public')));

// Servir archivos de la carpeta public del BackEnd (imágenes de productos)
app.use('/static', express.static(path.join(__dirname, 'public')));

// RUTAS DE LA API (para que el frontend pueda obtener/enviar datos)
app.use("/api/productos", productRoutes) // Rutas para productos
app.use("/api", salesRoutes) // Rutas para ventas

// RUTAS PARA CLIENTES (modularizadas)
app.use("/", clientRoutes)

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
  console.log(`🚀 Servidor CLIENTE corriendo en http://localhost:${app.get("PORT")}`)
  console.log(`📱 Interfaz Cliente: http://localhost:${app.get("PORT")}/`)
}) 