
/* Importa el modulo `mysql2` para conectar con la base de datos*/
const mysql = require('mysql2');

/* Configura la conexion con la base de datos MySQL*/
const pool = mysql.createPool({
  host: 'localhost', /* servidor localhost*/
  user: 'root',      /* Usuario de base de datos*/
  password: '1995',  /* Contraseña base de datos*/
  database: 'gym_system', /* Base de datos*/
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

/* Exporta el pool para que sea reutilizable en todo el proyecto.*/
module.exports = pool.promise();
