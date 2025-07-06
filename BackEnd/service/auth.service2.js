import Admin from "../models/admin.model";

const authService = {
  //login admin
  async login(email, password) {
    try {
      //buscar admin por email
      const admin = await Admin.findOne({
        where: {
          email: email,
          activo: true,
        },
      });

      if (!admin) {
        throw new Error("Credenciales invalidas");
      }

      //verificar contraseña
      const isPasswordValid = await admin.comparePassword(password);

      if (!isPasswordValid) {
        throw new Error("Credenciales invalidas");
      }

      //retornar admin sin contraseña
      return {
        id: admin.id,
        email: admin.email,
        nombre: admin.nombre,
        activo: admin.activo,
      };
    } catch (error) {
      throw error;
    }
  },

  //register
  async register(adminData) {
    try {
      //verificar si ya hay un admin con ese mail

      const existsAdmin = await Admin.findOne({
        where: {
          email: adminData.email,
        },
      });

      if (existsAdmin) {
        throw new Error("Ya existe un admin con ese email");
      }

      //crear nuevo admin
      const newAdmin = await Admin.create(adminData);

      return {
        id: newAdmin.id,
        email: newAdmin.email,
        nombre: newAdmin.nombre,
        activo: newAdmin.activo,
      };
    } catch (error) {
      throw error;
    }
  },

  //obtener admin por ID
  async getAdminByID(id) {
    try {
      const admin = Admin.findByPk(id, {
        attributes: { exclude: ["password"] },
      });

      return admin;
    } catch (error) {
      throw error;
    }
  },

  //cambiar contraseña
  async changePassword(adminId, currentPassword, newPassword) {
    try {
      const admin = await Admin.findByPk(adminId);

      if (!admin) {
        throw new Error("Admin no encontrado");
      }

      //verificar contraseña actual
      const isCurrentPasswordValid = await admin.comparePassword(
        currentPassword
      );
      if (!isCurrentPasswordValid) {
        throw new Error("La contraseña no coincide con su contraseña actual");
      }

      //actualizar contraseña
      admin.password = newPassword;
      await admin.save();

      return { message: "Contraseña actualizada con exito" }

    } catch (error) {

      throw error;
    }
  },
};

export default authService;
