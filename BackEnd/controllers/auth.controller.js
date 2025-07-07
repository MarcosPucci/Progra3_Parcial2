import authService from "../service/auth.service.js";

const authController = {
  // POST /loginAdmin.ejs - Login de admin
  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Validaciones básicas
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Email y contraseña son requeridos",
        });
      }

      // Validar formato de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: "Formato de email inválido",
        });
      }

      const admin = await authService.login(email, password);

      // Crear sesión (puedes usar express-session o JWT)
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

};

export default authController; 