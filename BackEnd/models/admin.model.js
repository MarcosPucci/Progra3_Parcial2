import { DataTypes } from "sequelize";
import sequelize from "../config/db-sequelize.js";
import bcrypt from "bcrypt";

const Admin = sequelize.define("Admin", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
}, {
  timestamps: true,
  hooks: {
    // Encriptar contraseña antes de guardar
    beforeCreate: async (admin) => {
      if (admin.password) {
        const saltRounds = 10;
        admin.password = await bcrypt.hash(admin.password, saltRounds);
      }
    },
  },
});

// Método para comparar contraseñas
Admin.prototype.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default Admin; 