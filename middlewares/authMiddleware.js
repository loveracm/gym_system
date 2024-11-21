// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

// Middleware para verificar el token JWT
exports.verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ error: 'Acceso denegado. No se proporcionó un token.' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET || 'defaultsecret');
    req.user = verified; // Agregamos los datos del usuario al objeto `req`
    next(); // Continuar con la siguiente función
  } catch (error) {
    res.status(400).json({ error: 'Token inválido.' });
  }
};
