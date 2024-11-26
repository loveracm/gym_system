const express = require('express');
const router = express.Router();
const { getAlumnoTurno } = require('../controllers/alumnoController');
const { verifyToken } = require('../middlewares/authMiddleware');

/*Ruta para obtener detalles del turno de un alumno*/
router.get('/:id/turno', verifyToken, getAlumnoTurno);

module.exports = router;
