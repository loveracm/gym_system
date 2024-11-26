const db = require('../config/db');

/*Obtener todos los ejercicios*/
exports.getAllExercises = async () => {
  const [rows] = await db.query(
    `SELECT exercises.id, exercises.name, exercises.description, muscles.name AS muscle
     FROM exercises
     LEFT JOIN muscles ON exercises.muscle_id = muscles.id`
  );
  return rows;
};

/*crear un ejercicio*/
exports.createExercise = async (name, muscle_id, description) => {
  const [result] = await db.query('INSERT INTO exercises (name, muscle_id, description) VALUES (?, ?, ?)', 
  [name, muscle_id, description]);
  return result.insertId;
};

/*crear un ejercicio*/
exports.updateExercise = async (id, name, muscle_id, description) => {
  const [result] = await db.query(
    'UPDATE exercises SET name = ?, muscle_id = ?, description = ? WHERE id = ?',
    [name, muscle_id, description, id]
  );
  return result.affectedRows;
};

/*crear un ejercicio*/
exports.deleteExercise = async (id) => {
  const [result] = await db.query('DELETE FROM exercises WHERE id = ?', [id]);
  return result.affectedRows;
};
