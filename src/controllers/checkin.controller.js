const checkinService = require('../services/checkin.service');

const createCheckin = async (req, res) => {
  try {
    const { uid } = req.user;
    const { estadoEmocional } = req.body;
    const checkin = await checkinService.registrarCheckin(uid, estadoEmocional);
    res.status(201).json({ message: 'Check-in registrado', checkin });
  } catch (error) {
    const status = error.status || 500;
    const response = { error: error.message || 'Error al registrar el check-in' };
    if (error.estadosValidos) response.estadosValidos = error.estadosValidos;
    res.status(status).json(response);
  }
};

const getHistory = async (req, res) => {
  try {
    const { uid } = req.user;
    const checkins = await checkinService.obtenerHistorial(uid);
    res.json({ checkins });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener historial' });
  }
};

const getToday = async (req, res) => {
  try {
    const { uid } = req.user;
    const result = await checkinService.obtenerCheckinHoy(uid);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error al verificar check-in de hoy' });
  }
};

module.exports = { createCheckin, getHistory, getToday };