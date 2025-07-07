import authService from "../service/auth.service.js";

const authController = {
  // POST /api/auth/login - Login de admin
  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Email y contraseña son requeridos",
        });
      }

      const admin = await authService.login(email, password);

      req.session.adminId = admin.id;
      req.session.adminEmail = admin.email;

      res.status(200).json({
        success: true,
        data: admin,
        message: "Login exitoso",
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        message: error.message || "Error en el login",
      });
    }
  },

  // POST /api/auth/register - Registrar nuevo admin
  async register(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Email y contraseña son requeridos",
        });
      }

      const admin = await authService.register({ email, password });

      res.status(201).json({
        success: true,
        data: admin,
        message: "Admin registrado exitosamente",
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message || "Error al registrar admin",
      });
    }
  },

  // POST /api/auth/logout - Logout
  async logout(req, res) {
    try {
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: "Error al cerrar sesión",
          });
        }
        
        res.status(200).json({
          success: true,
          message: "Logout exitoso",
        });
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al cerrar sesión",
      });
    }
  },

  // GET /api/auth/profile - Obtener perfil del admin
  async getProfile(req, res) {
    try {
      const adminId = req.session.adminId;
      
      if (!adminId) {
        return res.status(401).json({
          success: false,
          message: "No autorizado",
        });
      }

      const admin = await authService.getAdminById(adminId);
      
      if (!admin) {
        return res.status(404).json({
          success: false,
          message: "Admin no encontrado",
        });
      }

      res.status(200).json({
        success: true,
        data: admin,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al obtener perfil",
      });
    }
  },

  // POST /api/auth/change-password - Cambiar contraseña
  async changePassword(req, res) {
    try {
      const adminId = req.session.adminId;
      const { currentPassword, newPassword } = req.body;

      if (!adminId) {
        return res.status(401).json({
          success: false,
          message: "No autorizado",
        });
      }

      if (!currentPassword || !newPassword) {
        return res.status(400).json({
          success: false,
          message: "Contraseña actual y nueva contraseña son requeridas",
        });
      }

      const result = await authService.changePassword(adminId, currentPassword, newPassword);

      res.status(200).json({
        success: true,
        message: result.message,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message || "Error al cambiar contraseña",
      });
    }
  },
};

export default authController; 