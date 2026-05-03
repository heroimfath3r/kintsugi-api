const progresoService = require('../services/progreso.service');

const getProgress = async (req, res) => {
  try {
    const { uid } = req.user;
    const progreso = await progresoService.obtenerProgreso(uid);
    res.json({ progreso });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ error: error.message || 'Error al obtener progreso' });
  }
};

const getWeeklySummary = async (req, res) => {
  try {
    const { uid } = req.user;
    const resumen = await progresoService.obtenerResumenSemanal(uid);
    res.json(resumen);
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ error: error.message || 'Error al obtener resumen semanal' });
  }
};

module.exports = { getProgress, getWeeklySummary };