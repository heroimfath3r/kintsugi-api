const progresoModel = require('../models/progreso.model');
const { calcularProgresoFase } = require('../config/gamificacion');

const obtenerProgreso = async (uid) => {
  const progreso = await progresoModel.getUserProgress(uid);
  if (!progreso) {
    throw { status: 404, message: 'Perfil no encontrado' };
  }

  // Calcular avance dentro de la fase actual (lógica de negocio en backend)
  const progresoFase = calcularProgresoFase(progreso.xpTotal);

  // Obtener hitos con estado desbloqueado/bloqueado
  let hitos = [];
  try {
    const catalogo = await progresoModel.getCatalogoHitos();
    hitos = catalogo.map((hito) => ({
      ...hito,
      desbloqueado: progreso.misionesCompletadas >= hito.misionesRequeridas,
    }));
  } catch (e) {
    // Si falla la carga de hitos, la respuesta igual llega (con array vacío)
    console.error('Error al cargar catálogo de hitos:', e.message);
  }

  return {
    ...progreso,
    // Progreso dentro de la fase
    xpEnFaseActual: progresoFase.xpEnFaseActual,
    xpRangoFase: progresoFase.xpRangoFase,
    xpParaSiguienteFase: progresoFase.xpParaSiguienteFase,
    esFaseMaxima: progresoFase.esFaseMaxima,
    // Compatibilidad legacy (el frontend lo usa en algún fallback)
    siguienteFase: {
      xpNecesario: progresoFase.xpParaSiguienteFase ?? 0,
    },
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