const db = require('../config/db');

/*Obtener todos los turnos*/
exports.getAllShifts = async () => {
  const [rows] = await db.query(
    `SELECT shifts.id, shifts.date, shifts.time, shifts.status,
            trainers.name AS trainer_name, students.name AS student_name
     FROM shifts
     LEFT JOIN users AS trainers ON shifts.trainer_id = trainers.id
     LEFT JOIN users AS students ON shifts.student_id = students.id`
  );
  return rows;
};

/*Crear un turno*/
exports.createShift = async (date, time, trainer_id, student_id) => {
  const [result] = await db.query(
    'INSERT INTO shifts (date, time, trainer_id, student_id) VALUES (?, ?, ?, ?)',
    [date, time, trainer_id, student_id]
  );
  return result.insertId;
};

/*Actualizar el estado de un turno*/
exports.updateShiftStatus = async (id, status) => {
  const [result] = await db.query('UPDATE shifts SET status = ? WHERE id = ?', [status, id]);
  return result.affectedRows;
};

// Función para eliminar un turno
exports.deleteShift = async (id) => {
  const [result] = await db.query('DELETE FROM shifts WHERE id = ?', [id]);
  return result.affectedRows;
};

/*Verificar si un turno ya existe*/
exports.isShiftDuplicated = async (date, time, trainer_id, student_id) => {
  const [rows] = await db.query(
    `SELECT id FROM shifts 
     WHERE date = ? AND time = ? AND trainer_id = ? AND student_id = ?`,
    [date, time, trainer_id, student_id]
  );
  return rows.length > 0; /*Devuelve true (verdad) si existe un turno duplicado*/
};
