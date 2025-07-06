// Middleware para verificar si el admin está autenticado
export const requireAuth = (req, res, next) => {
  if (!req.session || !req.session.adminId) {
    return res.status(401).json({
      success: false,
      message: "Acceso denegado. Debes iniciar sesión como administrador.",
    });
  }
  next();
};

// Middleware para verificar si el admin está autenticado (para vistas EJS)
export const requireAuthView = (req, res, next) => {
  if (!req.session || !req.session.adminId) {
    return res.redirect('/login-admin');
  }
  next();
};

// Middleware para verificar si el admin NO está autenticado (para login)
export const requireNoAuth = (req, res, next) => {
  if (req.session && req.session.adminId) {
    return res.redirect('/admin');
  }
  next();
}; 