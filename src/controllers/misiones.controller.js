const misionService = require('../services/mision.service');

const getDailyMission = async (req, res) => {
  try {
    const { uid } = req.user;
    const mission = await misionService.obtenerMisionDiaria(uid);
    res.json({ mission });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ error: error.message || 'Error al obtener la misión del día' });
  }
};

const completeMission = async (req, res) => {
  try {
    const { uid } = req.user;
    const { id } = req.params;
    const result = await misionService.completarMision(uid, id);
    res.json(result);
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ error: error.message || 'Error al completar la misión' });
  }
};

const getHistory = async (req, res) => {
  try {
    const { uid } = req.user;
    const misiones = await misionService.obtenerHistorial(uid);
    res.json({ misiones });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener historial de misiones' });
  }
};

module.exports = { getDailyMission, completeMission, getHistory };