
// routes/muscleRoutes.js
const express = require('express');
const { getMuscles, createMuscle, updateMuscle, deleteMuscle } = require('../controllers/muscleController');
const { verifyToken } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', verifyToken, getMuscles);
router.post('/', verifyToken, createMuscle);
router.put('/:id', verifyToken, updateMuscle);
router.delete('/:id', verifyToken, deleteMuscle);

module.exports = router;
