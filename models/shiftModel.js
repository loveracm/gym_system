// models/shiftModel.js
const db = require('../config/db');

// Función para obtener todos los turnos
exports.getAllShifts = async () => {
  const [rows] = await db.query(
    `SELECT shifts.id, shifts.date, shifts.time, shifts.status,
            trainers.name AS trainer, students.name AS student
     FROM shifts
     LEFT JOIN users AS trainers ON shifts.trainer_id = trainers.id
     LEFT JOIN users AS students ON shifts.student_id = students.id`
  );
  return rows;
};

// Función para crear un turno
exports.createShift = async (date, time, trainer_id, student_id) => {
  const [result] = await db.query(
    'INSERT INTO shifts (date, time, trainer_id, student_id) VALUES (?, ?, ?, ?)',
    [date, time, trainer_id, student_id]
  );
  return result.insertId;
};
