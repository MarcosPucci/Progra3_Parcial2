import Admin from "../models/admin.model.js";

const authService = {
  // Login de admin
  async login(email, password) {
    try {
      // Buscar admin por email
      const admin = await Admin.findOne({
        where: { 
          email: email
        }
      });

      if (!admin) {
        throw new Error("Credenciales inválidas");
      }

      // Verificar contraseña
      const isPasswordValid = await admin.comparePassword(password);
      if (!isPasswordValid) {
        throw new Error("Credenciales inválidas");
      }

      // Retornar admin sin contraseña
      const { password: _, ...adminWithoutPassword } = admin.toJSON();
      return adminWithoutPassword;
    } catch (error) {
      throw error;
    }
  },

  // Registrar nuevo admin
  async register(adminData) {
    try {
      // Verificar si ya existe un admin con ese email
      const existingAdmin = await Admin.findOne({
        where: { email: adminData.email }
      });

      if (existingAdmin) {
        throw new Error("Ya existe un admin con ese email");
      }

      // Crear nuevo admin
      const newAdmin = await Admin.create(adminData);

      // Retornar admin sin contraseña
      const { password: _, ...adminWithoutPassword } = newAdmin.toJSON();
      return adminWithoutPassword;
    } catch (error) {
      throw error;
    }
  },

  // Obtener admin por ID
  async getAdminById(id) {
    try {
      const admin = await Admin.findByPk(id, {
        attributes: { exclude: ['password'] }
      });
      return admin;
    } catch (error) {
      throw error;
    }
  },

  // Cambiar contraseña
  async changePassword(adminId, currentPassword, newPassword) {
    try {
      const admin = await Admin.findByPk(adminId);
      if (!admin) {
        throw new Error("Admin no encontrado");
      }

      // Verificar contraseña actual
      const isCurrentPasswordValid = await admin.comparePassword(currentPassword);
      if (!isCurrentPasswordValid) {
        throw new Error("Contraseña actual incorrecta");
      }

      // Actualizar contraseña
      admin.password = newPassword;
      await admin.save();

      return { message: "Contraseña actualizada correctamente" };
    } catch (error) {
      throw error;
    }
  }
};

export default authService; 