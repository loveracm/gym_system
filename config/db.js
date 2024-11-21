// db.js
// Importamos el módulo `mysql2` para conectar con la base de datos.
const mysql = require('mysql2');

// Configuramos la conexión con la base de datos MySQL.
const pool = mysql.createPool({
  host: 'localhost', // Cambia si tu servidor no está en localhost
  user: 'root',      // Usuario de tu base de datos
  password: '1995',  // Contraseña de tu base de datos
  database: 'gym_system', // Nombre de la base de datos
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Exportamos el pool para que sea reutilizable en todo el proyecto.
module.exports = pool.promise();
