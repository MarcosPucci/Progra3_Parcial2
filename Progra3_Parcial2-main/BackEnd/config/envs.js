import dotenv from "dotenv";

dotenv.config();

export default {
  port: process.env.PORT,
  db_config: {
    host: process.env.DB_HOST,
    user: process.env.DB_CONNECTION,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
};
