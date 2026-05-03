const express = require('express');
const router = express.Router();
const progresoController = require('../controllers/progreso.controller');
const { verifyToken } = require('../middleware/auth.middleware');

// GET /api/progreso — datos de progreso del usuario
router.get('/', verifyToken, progresoController.getProgress);

// GET /api/progreso/weekly — resumen semanal con check-ins y misiones
router.get('/weekly', verifyToken, progresoController.getWeeklySummary);

module.exports = router;