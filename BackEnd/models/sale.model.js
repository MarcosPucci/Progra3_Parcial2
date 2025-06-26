import { DataTypes } from "sequelize";
import sequelize from "../config/db-sequelize.js";

// MODELO DE VENTA
// Define la estructura de una venta en nuestro sistema
const Venta = sequelize.define("Venta", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  fecha: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  cantidadProductos: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  productos: {
    type: DataTypes.TEXT, // JSON string de los productos
    allowNull: false,
  },
  estado: {
    type: DataTypes.ENUM('pendiente', 'completada', 'cancelada'),
    defaultValue: 'completada',
    allowNull: false,
  }
});

export default Venta; 