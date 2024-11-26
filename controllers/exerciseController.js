const Exercise = require('../models/exerciseModel');

exports.getExercises = async (req, res) => {
  try {
    const exercises = await Exercise.getAllExercises();
    res.status(200).json(exercises);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los ejercicios', details: error.message });
  }
};

exports.createExercise = async (req, res) => {
  const { name, muscle_id, description } = req.body;
  try {
    const id = await Exercise.createExercise(name, muscle_id, description);
    res.status(201).json({ message: 'Ejercicio creado', exerciseId: id });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el ejercicio', details: error.message });
  }
};

exports.updateExercise = async (req, res) => {
  const { id } = req.params;
  const { name, muscle_id, description } = req.body;
  try {
    const affectedRows = await Exercise.updateExercise(id, name, muscle_id, description);
    if (affectedRows === 0) {
      return res.status(404).json({ error: 'Ejercicio no encontrado' });
    }
    res.status(200).json({ message: 'Ejercicio actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el ejercicio', details: error.message });
  }
};

exports.deleteExercise = async (req, res) => {
  const { id } = req.params;
  try {
    const affectedRows = await Exercise.deleteExercise(id);
    if (affectedRows === 0) {
      return res.status(404).json({ error: 'Ejercicio no encontrado' });
    }
    res.status(200).json({ message: 'Ejercicio eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el ejercicio', details: error.message });
  }
};
