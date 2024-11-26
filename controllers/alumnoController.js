const pool = require('../config/db');

// Controlador para obtener detalles del turno de un alumno
exports.getAlumnoTurno = async (req, res) => {
  const { id } = req.params;

  try {
    const query = `
      SELECT 
        turnos.hora,
        turnos.estado,
        profesores.nombre AS profesor,
        musculos.nombre AS musculo,
        ejercicios.nombre AS ejercicio
      FROM turnos
      JOIN profesores ON turnos.id_profesor = profesores.id_profesor
      JOIN alumnos ON turnos.id_alumno = alumnos.id_alumno
      JOIN ejercicios ON ejercicios.id_ejercicio = turnos.id_ejercicio
      JOIN musculos ON ejercicios.id_musculo = musculos.id_musculo
      WHERE alumnos.id_alumno = ?;
    `;

    const [result] = await pool.query(query, [id]);

    if (result.length === 0) {
      return res.status(404).json({ error: 'No se encontró información para este alumno.' });
    }

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error del servidor. Inténtalo más tarde.' });
  }
};
