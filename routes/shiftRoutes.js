/*Shift (Turnos)*/
const express = require('express');
const { verifyToken, verifyRole } = require('../middlewares/authMiddleware');
const { getShifts, createShift, updateShiftStatus, deleteShift } = require('../controllers/shiftController');

const router = express.Router();

/*Todos los turnos (entrenadores y estudiantes)*/
router.get('/', verifyToken, getShifts);

/*Crear un nuevo turno (solo entrenador)*/
router.post('/', verifyToken, verifyRole(['trainer']), createShift);

/*Actualiza el estado de un turno (solo entrenador)*/
router.put('/:id', verifyToken, verifyRole(['trainer']), updateShiftStatus);

/*Elimina un turno (solo entrenador)*/
router.delete('/:id', verifyToken, verifyRole(['trainer']), deleteShift);

module.exports = router;
