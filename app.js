// app.js
// Importamos las dependencias necesarias
const express = require('express');
const db = require('./config/db');

// Creamos la aplicación Express
const app = express();

// Middleware para analizar JSON en las solicitudes
app.use(express.json());

// Ruta principal para probar la conexión
app.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT 1 + 1 AS result');
    res.json({ message: 'Conexión exitosa a la base de datos', result: rows[0].result });
  } catch (error) {
    res.status(500).json({ error: 'Error al conectar con la base de datos', details: error.message });
  }
});

// Configuramos el puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`));
