const express = require('express');
const db = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const muscleRoutes = require('./routes/muscleRoutes');
const exerciseRoutes = require('./routes/exerciseRoutes');
const authRoutes = require('./routes/authRoutes');
const shiftRoutes = require('./routes/shiftRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(express.json());

/*Rutas principales*/
app.use('/api/users', userRoutes);
app.use('/api/muscles', muscleRoutes);
app.use('/api/exercises', exerciseRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/shifts', shiftRoutes);

/*Prueba de conexión inicial*/
app.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT 1 + 1 AS result');
    res.json({ message: 'Conexión exitosa a la base de datos', result: rows[0].result });
  } catch (error) {
    res.status(500).json({ error: 'Error al conectar con la base de datos', details: error.message });
  }
});

/*Middleware para manejar errores*/
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`));
