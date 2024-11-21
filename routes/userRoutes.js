const express = require('express');
const { verifyToken } = require('../middlewares/authMiddleware');
const { getUsers, createUser, getUserById, updateUser, deleteUser } = require('../controllers/userController');

const router = express.Router();

// Proteger todas las rutas con `verifyToken`
router.get('/', verifyToken, getUsers);
router.get('/:id', verifyToken, getUserById);
router.post('/', verifyToken, createUser);
router.put('/:id', verifyToken, updateUser);
router.delete('/:id', verifyToken, deleteUser);

module.exports = router;
