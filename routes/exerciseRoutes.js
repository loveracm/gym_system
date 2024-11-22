
const express = require('express');
const { getExercises, createExercise, updateExercise, deleteExercise } = require('../controllers/exerciseController');
const { verifyToken } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', verifyToken, getExercises);
router.post('/', verifyToken, createExercise);
router.put('/:id', verifyToken, updateExercise);
router.delete('/:id', verifyToken, deleteExercise);

module.exports = router;
