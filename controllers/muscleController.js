// controllers/muscleController.js
const Muscle = require('../models/muscleModel');

exports.getMuscles = async (req, res) => {
  try {
    const muscles = await Muscle.getAllMuscles();
    res.status(200).json(muscles);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los músculos', details: error.message });
  }
};

exports.createMuscle = async (req, res) => {
  const { name, description } = req.body;
  try {
    const id = await Muscle.createMuscle(name, description);
    res.status(201).json({ message: 'Músculo creado', muscleId: id });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el músculo', details: error.message });
  }
};
