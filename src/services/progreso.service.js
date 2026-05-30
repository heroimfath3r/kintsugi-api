//C:\Proyectos\Kintsugi-api\src\services\progreso.service.js
const progresoModel = require('../models/progreso.model');
const { calcularProgresoFase } = require('../config/gamificacion');

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

  // Modelo A (XP acumulativo): calcular avance DENTRO de la fase actual.
  // Esto centraliza la regla de negocio en backend; el frontend solo pinta.
  const progresoFase = calcularProgresoFase(progreso.xp || 0);

  return {
    ...progreso,
    hitos,
    // Campos nuevos para la barra de XP (Modelo A acumulativo).
    xpEnFaseActual: progresoFase.xpEnFaseActual,
    xpRangoFase: progresoFase.xpRangoFase,
    xpParaSiguienteFase: progresoFase.xpParaSiguienteFase,
    xpInicioFase: progresoFase.xpInicioFase,
    xpFinFase: progresoFase.xpFinFase,
    esFaseMaxima: progresoFase.esFaseMaxima,
    // Campo legacy (compatibilidad con frontend viejo, no lo borres).
    siguienteFase: {
      xpNecesario: progresoFase.xpFinFase, // null si es fase maxima
    },
  };
};

const obtenerResumenSemanal = async (uid) => {
  const progreso = await progresoModel.getUserProgress(uid);
  if (!progreso) {
    throw { status: 404, message: 'Perfil no encontrado' };
  }
  const checkins = await progresoModel.getWeeklyCheckins(uid);
  const misiones = await progresoModel.getWeeklyMissions(uid);
  // Calcular estado emocional mas frecuente de la semana
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