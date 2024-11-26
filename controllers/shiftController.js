const Shift = require('../models/shiftModel');

/* Obtener todos los turnos*/
exports.getShifts = async (req, res) => {
  try {
    const shifts = await Shift.getAllShifts();
    res.status(200).json(shifts);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los turnos', details: error.message });
  }
};

/*Crea un nuevo turno*/
exports.createShift = async (req, res) => {
  const { date, time, trainer_id, student_id } = req.body;
  try {
    /*Validar duplicados*/
    const isDuplicated = await Shift.isShiftDuplicated(date, time, trainer_id, student_id);
    if (isDuplicated) {
      return res.status(400).json({ error: 'Ya existe un turno con los mismos datos.' });
    }

    /*Crear el turno*/
    const shiftId = await Shift.createShift(date, time, trainer_id, student_id);
    res.status(201).json({ message: 'Turno creado exitosamente', shiftId });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el turno', details: error.message });
  }
};

/*Actualizar el estado de un turno*/
exports.updateShiftStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const affectedRows = await Shift.updateShiftStatus(id, status);
    if (affectedRows === 0) {
      return res.status(404).json({ error: 'Turno no encontrado' });
    }
    res.status(200).json({ message: 'Estado del turno actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el turno', details: error.message });
  }
};

/*Eliminar un turno*/
exports.deleteShift = async (req, res) => {
  const { id } = req.params;
  try {
    const affectedRows = await Shift.deleteShift(id);
    if (affectedRows === 0) {
      return res.status(404).json({ error: 'Turno no encontrado' });
    }
    res.status(200).json({ message: 'Turno eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el turno', details: error.message });
  }
};

exports.updateShiftStatus = async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const affectedRows = await Shift.updateShiftStatus(id, status);
    if (affectedRows === 0) {
      /*Lanza un error personalizado*/
      const error = new Error('Turno no encontrado');
      error.status = 404;
      throw error;
    }
    res.status(200).json({ message: 'Estado del turno actualizado exitosamente' });
  } catch (error) {
    next(error); /* Pasa el error al middleware*/
  }
};

exports.getShifts = async (req, res, next) => {
  try {
    const { role, id } = req.user;

    let shifts;
    if (role === 'trainer') {
      /* El entrenador ve todos los turnos*/
      shifts = await Shift.getAllShifts();
    } else if (role === 'student') {
      /*Los estudiantes solo ven sus turnos*/
      shifts = await db.query(
        `SELECT shifts.id, shifts.date, shifts.time, shifts.status,
                trainers.name AS trainer_name
         FROM shifts
         LEFT JOIN users AS trainers ON shifts.trainer_id = trainers.id
         WHERE shifts.student_id = ?`,
        [id]
      );
      shifts = shifts[0];
    } else {
      return res.status(403).json({ error: 'No tienes permiso para ver esta información.' });
    }

    res.status(200).json(shifts);
  } catch (error) {
    next(error);
  }
};
