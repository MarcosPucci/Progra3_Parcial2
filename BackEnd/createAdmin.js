import authService from "./service/auth.service.js";
import sequelize from "./config/db-sequelize.js";

const createFirstAdmin = async () => {
  try {
    // Sincronizar la base de datos
    await sequelize.sync();
    console.log("Base de datos sincronizada");

    // Datos del primer admin
    const adminData = {
      email: "admin@puntocontrol.com",
      password: "admin123",
      nombre: "Administrador Principal"
    };

    // Crear el admin
    const admin = await authService.register(adminData);
    
    console.log("Admin creado exitosamente:");
    console.log(`   Email: ${admin.email}`);
    console.log(`   Nombre: ${admin.nombre}`);
    console.log(`   ID: ${admin.id}`);
    console.log("\n Credenciales de acceso:");
    console.log(`   Email: ${adminData.email}`);
    console.log(`   Contraseña: ${adminData.password}`);
    console.log("\n  IMPORTANTE: Cambia la contraseña después del primer login");

  } catch (error) {
    if (error.message.includes("Ya existe un admin con ese email")) {
      console.log("ℹ  El admin ya existe en la base de datos");
    } else {
      console.error(" Error al crear admin:", error.message);
    }
  } finally {
    process.exit(0);
  }
};

createFirstAdmin(); 