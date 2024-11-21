// routes/userRoutes.js
// Importamos Express para manejar las rutas
const express = require('express');
const { getUsers, createUser, getUserById, updateUser, deleteUser } = require('../controllers/userController');

// Creamos un router para las rutas de usuario
const router = express.Router();

// Ruta para obtener todos los usuarios
router.get('/', getUsers);

// Ruta para obtener un usuario por su ID
router.get('/:id', getUserById);

// Ruta para crear un nuevo usuario
router.post('/', createUser);

// Ruta para actualizar un usuario por su ID
router.put('/:id', updateUser);

// Ruta para eliminar un usuario por su ID
router.delete('/:id', deleteUser);

module.exports = router;
