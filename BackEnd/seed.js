import Juego from "./models/product.model.js";
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Leer el archivo JSON de forma síncrona
const juegosData = JSON.parse(
  readFileSync(join(__dirname, '..', 'FrontEnd', 'json', 'juegos.json'), 'utf8')
);

const seedDatabase = async () => {
  try {
    console.log("Iniciando inserción de datos...");
    
    // Limpiar la tabla antes de insertar (opcional)
    await Juego.destroy({ where: {} });
    console.log("Tabla limpiada");
    
    // Insertar juegos uno por uno usando create()
    let juegosInsertados = 0;
    
    for (const juego of juegosData) {
      try {
        await Juego.create({
          titulo: juego.titulo,
          genero: Array.isArray(juego.genero) ? juego.genero.join(", ") : juego.genero,
          anioDeSalida: juego.añoDeSalida,
          categoria: juego.categoria,
          precio: juego.precio,
          descripcion: juego.descripcion,
          img: juego.img,
          activo: juego.activo,
          cantidad: juego.cantidad || 1
        });
        juegosInsertados++;
        console.log(`✅ Insertado: ${juego.titulo}`);
      } catch (error) {
        console.error(`❌ Error al insertar ${juego.titulo}:`, error.message);
      }
    }
    
    console.log(`✅ ${juegosInsertados} juegos insertados exitosamente`);
    
    // Mostrar algunos juegos insertados como confirmación
    const juegosMostrar = await Juego.findAll({
      limit: 5,
      attributes: ['id', 'titulo', 'categoria', 'precio']
    });
    
    console.log("\n📋 Primeros 5 juegos insertados:");
    juegosMostrar.forEach(juego => {
      console.log(`  - ${juego.id}: ${juego.titulo} (${juego.categoria}) - $${juego.precio}`);
    });
    
    console.log("\n🎉 Base de datos poblada exitosamente!");
    process.exit(0);
    
  } catch (error) {
    console.error("❌ Error al insertar datos:", error.message);
    process.exit(1);
  }
};

// Ejecutar el seed
seedDatabase(); 