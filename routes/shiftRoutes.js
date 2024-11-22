const express = require('express');
const { verifyToken, verifyRole } = require('../middlewares/authMiddleware');
const { getShifts, createShift, updateShiftStatus, deleteShift } = require('../controllers/shiftController');

const router = express.Router();

// Obtener todos los turnos (entrenadores y estudiantes)
router.get('/', verifyToken, getShifts);

// Crear un nuevo turno (solo entrenadores)
router.post('/', verifyToken, verifyRole(['trainer']), createShift);

// Actualizar el estado de un turno (solo entrenadores)
router.put('/:id', verifyToken, verifyRole(['trainer']), updateShiftStatus);

// Eliminar un turno (solo entrenadores)
router.delete('/:id', verifyToken, verifyRole(['trainer']), deleteShift);

module.exports = router;
