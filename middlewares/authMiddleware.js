const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ error: 'Acceso denegado. No se proporcionó un token.' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET || 'defaultsecret');
    req.user = verified; 
  } catch (error) {
    res.status(400).json({ error: 'Token inválido.' });
  }
};

exports.verifyRole = (allowedRoles) => (req, res, next) => {
  const { role } = req.user; 
  if (!allowedRoles.includes(role)) {
    return res.status(403).json({ error: 'No tienes permiso para realizar esta acción.' });
  }
  next();
};