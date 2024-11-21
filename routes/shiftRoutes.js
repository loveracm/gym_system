const express = require('express');
const { body, param } = require('express-validator');
const { verifyToken } = require('../middlewares/authMiddleware');
const { getShifts, createShift, updateShiftStatus, deleteShift } = require('../controllers/shiftController');

const router = express.Router();

// Obtener todos los turnos
router.get('/', verifyToken, getShifts);

// Crear un nuevo turno con validaciones
router.post(
  '/',
  verifyToken,
  [
    body('date').isDate().withMessage('La fecha debe ser válida (YYYY-MM-DD)'),
    body('time').matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/).withMessage('La hora debe ser válida (HH:MM:SS)'),
    body('trainer_id').isInt().withMessage('El ID del entrenador debe ser un número entero'),
    body('student_id').isInt().withMessage('El ID del estudiante debe ser un número entero'),
  ],
  createShift
);

// Actualizar el estado de un turno con validaciones
router.put(
  '/:id',
  verifyToken,
  [
    param('id').isInt().withMessage('El ID debe ser un número entero'),
    body('status').isIn(['pending', 'confirmed', 'cancelled']).withMessage('El estado no es válido'),
  ],
  updateShiftStatus
);

// Eliminar un turno
router.delete(
  '/:id',
  verifyToken,
  [param('id').isInt().withMessage('El ID debe ser un número entero')],
  deleteShift
);

module.exports = router;
