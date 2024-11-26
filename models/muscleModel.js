const db = require('../config/db');

/*Obtener todos los músculos*/
exports.getAllMuscles = async () => {
  const [rows] = await db.query('SELECT * FROM muscles');
  return rows;
};

/*Crear un músculo*/
exports.createMuscle = async (name, description) => {
  const [result] = await db.query('INSERT INTO muscles (name, description) VALUES (?, ?)', [name, description]);
  return result.insertId;
};

/*Actualiar un músculo*/
exports.updateMuscle = async (id, name, description) => {
  const [result] = await db.query(
    'UPDATE muscles SET name = ?, description = ? WHERE id = ?',
    [name, description, id]
  );
  return result.affectedRows;
};

/*Borrar un músculo*/
exports.deleteMuscle = async (id) => {
  const [result] = await db.query('DELETE FROM muscles WHERE id = ?', [id]);
  return result.affectedRows;
};
