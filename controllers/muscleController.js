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

exports.updateMuscle = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const affectedRows = await Muscle.updateMuscle(id, name, description);
    if (affectedRows === 0) {
      return res.status(404).json({ error: 'Músculo no encontrado' });
    }
    res.status(200).json({ message: 'Músculo actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el músculo', details: error.message });
  }
};

exports.deleteMuscle = async (req, res) => {
  const { id } = req.params;
  try {
    const affectedRows = await Muscle.deleteMuscle(id);
    if (affectedRows === 0) {
      return res.status(404).json({ error: 'Músculo no encontrado' });
    }
    res.status(200).json({ message: 'Músculo eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el músculo', details: error.message });
  }
};

