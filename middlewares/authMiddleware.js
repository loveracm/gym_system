const jwt = require('jsonwebtoken');

/*Middleware para verificar el token*/
exports.verifyToken = (req, res, next) => {
  /*Obtener el token del encabezado 'Authorization'*/
  const token = req.header('Authorization');
  
  /*Verificar si el token existe*/
  if (!token) {
    return res.status(401).json({ error: 'Acceso denegado. No se proporcionó un token.' });
  }

  try {
    /*Validar el token con la clave secreta*/
    const verified = jwt.verify(token, process.env.JWT_SECRET || 'defaultsecret');
    req.user = verified; /*Guardar los datos del usuario en la solicitud*/
    next(); /*Continuar al siguiente middleware*/
  } catch (error) {
    // Manejar errores de token inválido o expirado
    return res.status(400).json({ error: 'Token inválido.' });
  }
};

/*Middleware para verificar roles permitidos*/
exports.verifyRole = (allowedRoles) => (req, res, next) => {
  /*Obtener el rol del usuario autenticado*/
  const { role } = req.user;

  /*Verificar si el rol está en la lista de roles permitidos*/
  if (!allowedRoles.includes(role)) {
    return res.status(403).json({ error: 'No tienes permiso para realizar esta acción.' });
  }
  
  next(); 
};
