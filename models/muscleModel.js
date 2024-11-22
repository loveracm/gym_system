// models/muscleModel.js
const db = require('../config/db');

// Función para obtener todos los músculos
exports.getAllMuscles = async () => {
  const [rows] = await db.query('SELECT * FROM muscles');
  return rows;
};

// Función para crear un músculo
exports.createMuscle = async (name, description) => {
  const [result] = await db.query('INSERT INTO muscles (name, description) VALUES (?, ?)', [name, description]);
  return result.insertId;
};

// models/muscleModel.js
exports.updateMuscle = async (id, name, description) => {
  const [result] = await db.query(
    'UPDATE muscles SET name = ?, description = ? WHERE id = ?',
    [name, description, id]
  );
  return result.affectedRows;
};

exports.deleteMuscle = async (id) => {
  const [result] = await db.query('DELETE FROM muscles WHERE id = ?', [id]);
  return result.affectedRows;
};
