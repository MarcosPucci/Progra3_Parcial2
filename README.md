# Sistema de Autoservicio - Tienda de Videojuegos

## Descripción
Sistema completo de autoservicio para una tienda de videojuegos con interfaz de cliente y panel de administración.

## Características

### Cliente
- ✅ Catálogo de productos con filtros por categoría (PS4/PC)
- ✅ Carrito de compras funcional
- ✅ Sistema de búsqueda de productos
- ✅ Finalización de compra con generación de ticket
- ✅ Tema claro/oscuro
- ✅ Interfaz responsive

### Administrador
- ✅ Login seguro con bcrypt
- ✅ Panel de administración
- ✅ Gestión completa de productos (CRUD)
- ✅ Activación/desactivación de productos
- ✅ Historial de ventas
- ✅ Gestión de inventario

## Instalación

### Prerrequisitos
- Node.js (versión 14 o superior)
- MySQL (versión 8.0 o superior)

### Pasos de instalación

1. **Clonar el repositorio**
```bash
git clone <url-del-repositorio>
cd Progra3_Parcial2
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar base de datos**
   - Personalizar las variables de entorno según tu configuración de MySQL

4. **Crear administrador inicial**
```bash
npm run create-admin
```

5. **Ejecutar el servidor**
```bash
npm start
```

El servidor estará disponible en `http://localhost:3000`

## Estructura del Proyecto

```
Progra3_Parcial2/
├── BackEnd/
│   ├── config/          # Configuración de BD
│   ├── controllers/     # Controladores de la API
│   ├── models/          # Modelos de datos
│   ├── routes/          # Rutas de la API
│   ├── service/         # Lógica de negocio
│   └── server.js        # Servidor principal
├── FrontEnd/
│   ├── css/            # Estilos
│   ├── htmlCliente/    # Páginas del cliente
│   ├── js/             # JavaScript del frontend
│   ├── views/          # Vistas del admin (EJS)
│   └── public/         # Archivos estáticos
└── package.json
```

## API Endpoints

### Productos
- `GET /api/productos` - Obtener todos los productos
- `GET /api/productos/active` - Obtener productos activos
- `GET /api/productos/:id` - Obtener producto por ID
- `POST /api/productos` - Crear producto
- `PUT /api/productos/:id` - Actualizar producto
- `DELETE /api/productos/:id` - Desactivar producto
- `PATCH /api/productos/:id/activate` - Activar producto

### Ventas
- `POST /api/finalizarCompra` - Finalizar compra
- `GET /api/ventas` - Obtener todas las ventas
- `GET /api/ventas/:id` - Obtener venta por ID

### Autenticación
- `POST /api/auth/login` - Login de administrador

## Tecnologías Utilizadas

- **Backend**: Node.js, Express.js, Sequelize ORM
- **Base de Datos**: MySQL
- **Frontend**: HTML5, CSS3, JavaScript
- **Autenticación**: bcrypt
- **UI Framework**: Bootstrap 5
- **Motor de Vistas**: EJS

## Autores
- Marcos Fernandez
- Marcos Pucci 
