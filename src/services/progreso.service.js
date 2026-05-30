const progresoModel = require('../models/progreso.model');
const { calcularProgresoFase } = require('../config/gamificacion');

const obtenerProgreso = async (uid) => {
  const progreso = await progresoModel.getUserProgress(uid);
  if (!progreso) throw { status: 404, message: 'Perfil no encontrado' };

  const catalogo = await progresoModel.getCatalogoHitos();
  const hitos = catalogo.map((hito) => ({
    ...hito,
    desbloqueado: progreso.misionesCompletadas >= hito.misionesRequeridas,
  }));

  const progresoFase = calcularProgresoFase(progreso.xp || 0);

  return {
    ...progreso,
    hitos,
    xpEnFaseActual: progresoFase.xpEnFaseActual,
    xpRangoFase: progresoFase.xpRangoFase,
    xpParaSiguienteFase: progresoFase.xpParaSiguienteFase,
    xpInicioFase: progresoFase.xpInicioFase,
    xpFinFase: progresoFase.xpFinFase,
    esFaseMaxima: progresoFase.esFaseMaxima,
    siguienteFase: { xpNecesario: progresoFase.xpFinFase },
  };
};

const obtenerResumenSemanal = async (uid) => {
  const progreso = await progresoModel.getUserProgress(uid);
  if (!progreso) throw { status: 404, message: 'Perfil no encontrado' };
  const checkins = await progresoModel.getWeeklyCheckins(uid);
  const misiones = await progresoModel.getWeeklyMissions(uid);

  const conteoEmociones = {};
  checkins.forEach((c) => {
    conteoEmociones[c.estadoEmocional] = (conteoEmociones[c.estadoEmocional] || 0) + 1;
  });

  let estadoFrecuente = null;
  let maxConteo = 0;
  for (const [estado, conteo] of Object.entries(conteoEmociones)) {
    if (conteo > maxConteo) { maxConteo = conteo; estadoFrecuente = estado; }
  }

  return {
    progreso,
    resumenSemanal: {
      totalCheckins: checkins.length,
      totalMisiones: misiones.length,
      misionesCompletadas: misiones.filter((m) => m.completada).length,
      estadoFrecuente,
      checkins,
      misiones,
    },
  };
};

module.exports = { obtenerProgreso, obtenerResumenSemanal };
