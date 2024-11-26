
const errorHandler = (err, req, res, next) => {
    console.error(err.stack); /*Depurar*/
  
    /*Error en el servidor 500 */
    const statusCode = err.status || 500;
    res.status(statusCode).json({
      error: err.message || 'Ocurrió un error en el servidor',
      details: err.details || null,
    });
  };
  
  module.exports = errorHandler;
  