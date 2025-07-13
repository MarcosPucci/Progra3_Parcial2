import dotenv from "dotenv";

dotenv.config();

export default {
  port: process.env.PORT,
  portCliente: process.env.PORT_CLIENTE || 3000,
  portAdmin: process.env.PORT_ADMIN || 3001,
  db_config: {
    host: process.env.DB_HOST,
    user: process.env.DB_CONNECTION,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  },
};
