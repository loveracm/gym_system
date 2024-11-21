const express = require('express');
const { getMuscles, createMuscle } = require('../controllers/muscleController');
const router = express.Router();

router.get('/', getMuscles);
router.post('/', createMuscle);

module.exports = router;
