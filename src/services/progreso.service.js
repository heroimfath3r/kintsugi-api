//C:\Proyectos\Kintsugi-api\src\services\progreso.service.js
const progresoModel = require('../models/progreso.model');

const obtenerProgreso = async (uid) => {
  const progreso = await progresoModel.getUserProgress(uid);

  if (!progreso) {
    throw { status: 404, message: 'Perfil no encontrado' };
  }

  // HU-14: calcular estado de cada hito segun misiones completadas.
  const catalogo = await progresoModel.getCatalogoHitos();
  const hitos = catalogo.map((hito) => ({
    ...hito,
    desbloqueado: progreso.misionesCompletadas >= hito.misionesRequeridas,
  }));

  return {
    ...progreso,
    hitos,
  };
};

const obtenerResumenSemanal = async (uid) => {
  const progreso = await progresoModel.getUserProgress(uid);

  if (!progreso) {
    throw { status: 404, message: 'Perfil no encontrado' };
  }

  const checkins = await progresoModel.getWeeklyCheckins(uid);
  const misiones = await progresoModel.getWeeklyMissions(uid);

  // Calcular estado emocional más frecuente de la semana
  const conteoEmociones = {};
  checkins.forEach((c) => {
    const estado = c.estadoEmocional;
    conteoEmociones[estado] = (conteoEmociones[estado] || 0) + 1;
  });

  let estadoFrecuente = null;
  let maxConteo = 0;
  for (const [estado, conteo] of Object.entries(conteoEmociones)) {
    if (conteo > maxConteo) {
      maxConteo = conteo;
      estadoFrecuente = estado;
    }
  }

  const misionesCompletadasSemana = misiones.filter((m) => m.completada).length;

  return {
    progreso,
    resumenSemanal: {
      totalCheckins: checkins.length,
      totalMisiones: misiones.length,
      misionesCompletadas: misionesCompletadasSemana,
      estadoFrecuente,
      checkins,
      misiones,
    },
  };
};

module.exports = { obtenerProgreso, obtenerResumenSemanal };