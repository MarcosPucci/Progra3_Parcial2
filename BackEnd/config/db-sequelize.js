import { Sequelize } from "sequelize";
import envs from "./envs.js";

const { host, user, password, database, port } = envs.db_config;

const sequelize = new Sequelize(database, user, password, {
  host: host,
  dialect: "mysql",
  port: port,
  logging: false,
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connection established successfully.");
    
    await sequelize.sync({ alter: true });
    console.log("✅ Database synchronized successfully.");
    
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error.message);
    console.error("Verifica que:");
    console.error("1. MySQL esté corriendo");
    console.error("2. Las credenciales en .env sean correctas");
    console.error("3. La base de datos exista");
  }
};

connectDB();

export default sequelize;
