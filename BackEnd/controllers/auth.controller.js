import authService from "../service/auth.service.js";

const authController = {
  // POST /api/auth/login - Login de admin
  async login(req, res) {
    try {
      console.log("Login attempt:", req.body);
      
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Email y contraseña son requeridos",
        });
      }

      console.log("Validating credentials for:", email);
      
      const admin = await authService.login(email, password);

      console.log("Login successful for:", email);

      res.status(200).json({
        success: true,
        data: admin,
        message: "Login exitoso",
      });
    } catch (error) {
      console.error("Login error:", error.message);
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
      res.status(200).json({
        success: true,
        message: "Logout exitoso",
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
      res.status(200).json({
        success: true,
        message: "Perfil obtenido correctamente",
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
      const { currentPassword, newPassword } = req.body;

      if (!currentPassword || !newPassword) {
        return res.status(400).json({
          success: false,
          message: "Contraseña actual y nueva contraseña son requeridas",
        });
      }

      res.status(200).json({
        success: true,
        message: "Contraseña cambiada exitosamente",
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