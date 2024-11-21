// controllers/userController.js
// Importamos el pool de conexión a la base de datos
const db = require('../config/db');

// Controlador para obtener todos los usuarios
exports.getUsers = async (req, res) => {
  try {
    const [users] = await db.query('SELECT id, name, email, role, created_at FROM users');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los usuarios', details: error.message });
  }
};

// Controlador para obtener un usuario por su ID
exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const [user] = await db.query('SELECT id, name, email, role, created_at FROM users WHERE id = ?', [id]);
    if (user.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.status(200).json(user[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el usuario', details: error.message });
  }
};

// Controlador para crear un nuevo usuario
exports.createUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const result = await db.query('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)', 
    [name, email, password, role || 'student']);
    res.status(201).json({ message: 'Usuario creado exitosamente', userId: result[0].insertId });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el usuario', details: error.message });
  }
};

// Controlador para actualizar un usuario
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, role } = req.body;
  try {
    const [result] = await db.query('UPDATE users SET name = ?, email = ?, password = ?, role = ? WHERE id = ?', 
    [name, email, password, role, id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.status(200).json({ message: 'Usuario actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el usuario', details: error.message });
  }
};

// Controlador para eliminar un usuario
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.status(200).json({ message: 'Usuario eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el usuario', details: error.message });
  }
};
