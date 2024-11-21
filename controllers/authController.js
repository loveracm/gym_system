// controllers/authController.js
const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registro de un nuevo usuario
exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Verificar si el usuario ya existe
    const [existingUser] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ error: 'El correo ya está registrado.' });
    }

    // Hashear la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Guardar el usuario en la base de datos
    const result = await db.query('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)', 
    [name, email, hashedPassword, role || 'student']);
    res.status(201).json({ message: 'Usuario registrado exitosamente', userId: result[0].insertId });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar el usuario', details: error.message });
  }
};

// Login de un usuario
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificar si el usuario existe
    const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) {
      return res.status(404).json({ error: 'Correo o contraseña incorrectos.' });
    }

    const user = users[0];

    // Verificar la contraseña
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(404).json({ error: 'Correo o contraseña incorrectos.' });
    }

    // Generar un token JWT
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || 'defaultsecret',
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Inicio de sesión exitoso', token });
  } catch (error) {
    res.status(500).json({ error: 'Error al iniciar sesión', details: error.message });
  }
};
