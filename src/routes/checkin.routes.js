const express = require('express');
const router = express.Router();
const checkinController = require('../controllers/checkin.controller');
const { verifyToken } = require('../middleware/auth.middleware');

// POST /api/checkin — registra el check-in emocional diario
router.post('/', verifyToken, checkinController.createCheckin);

// GET /api/checkin/history — historial de check-ins del usuario
router.get('/history', verifyToken, checkinController.getHistory);

// GET /api/checkin/today — verifica si ya hizo check-in hoy
router.get('/today', verifyToken, checkinController.getToday);

module.exports = router;