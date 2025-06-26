import { DataTypes } from "sequelize";
import sequelize from "../config/db-sequelize.js";

// MODELO DE PRODUCTO
// Define la estructura de un juego en nuestro sistema usando Sequelize
const Juego = sequelize.define("Juego", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  genero: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  anioDeSalida: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  categoria: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2), //10 numeros totales, 2 despues de la coma
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  img: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  },
  cantidad: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    allowNull: false,
  },
});

export default Juego;