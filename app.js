// app.js
const express = require('express');
const db = require('./config/db');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(express.json());

// Rutas principales
app.use('/api/users', userRoutes);

// Prueba de conexión inicial
app.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT 1 + 1 AS result');
    res.json({ message: 'Conexión exitosa a la base de datos', result: rows[0].result });
  } catch (error) {
    res.status(500).json({ error: 'Error al conectar con la base de datos', details: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`));
