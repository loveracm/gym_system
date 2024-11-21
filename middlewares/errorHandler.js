// Middleware para manejar errores
const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log del error para depuración
  
    // Si el error tiene un código de estado específico, úsalo; de lo contrario, 500
    const statusCode = err.status || 500;
    res.status(statusCode).json({
      error: err.message || 'Ocurrió un error en el servidor',
      details: err.details || null,
    });
  };
  
  module.exports = errorHandler;
  