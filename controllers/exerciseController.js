// controllers/exerciseController.js
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
