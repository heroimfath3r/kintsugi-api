const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { verifyToken } = require('../middleware/auth.middleware');

// POST /api/auth/register — crea perfil en Firestore después del registro
router.post('/register', verifyToken, authController.register);

// GET /api/auth/profile — obtiene el perfil del usuario
router.get('/profile', verifyToken, authController.getProfile);

// PUT /api/auth/archetype — guarda el arquetipo asignado tras el test
router.put('/archetype', verifyToken, authController.updateArchetype);

module.exports = router;