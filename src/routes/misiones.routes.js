const express = require('express');
const router = express.Router();
const misionesController = require('../controllers/misiones.controller');
const { verifyToken } = require('../middleware/auth.middleware');

// GET /api/misiones/daily — obtiene la misión del día
router.get('/daily', verifyToken, misionesController.getDailyMission);

// PUT /api/misiones/:id/complete — marca misión como completada
router.put('/:id/complete', verifyToken, misionesController.completeMission);

// GET /api/misiones/history — historial de misiones
router.get('/history', verifyToken, misionesController.getHistory);

module.exports = router;