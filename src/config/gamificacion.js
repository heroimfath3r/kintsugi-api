// Umbrales de XP para cada fase
// Fase 1: 0-99 XP, Fase 2: 100-199 XP, Fase 3: 200+ XP
const UMBRALES_FASE = [0, 100, 200];
const XP_POR_MISION = 25;

/**
 * Devuelve el número de fase (1, 2 o 3) según el XP total acumulado.
 * @param {number} xpTotal
 * @returns {number}
 */
const calcularFase = (xpTotal) => {
  if (xpTotal >= UMBRALES_FASE[2]) return 3;
  if (xpTotal >= UMBRALES_FASE[1]) return 2;
  return 1;
};

/**
 * Devuelve el desglose del progreso DENTRO de la fase actual.
 * Ejemplo: 150 XP → Fase 2 → 50/100 XP dentro de la fase.
 * @param {number} xpTotal
 * @returns {object}
 */
const calcularProgresoFase = (xpTotal) => {
  const fase = calcularFase(xpTotal);
  const esFaseMaxima = fase >= UMBRALES_FASE.length;

  const xpInicioFase = UMBRALES_FASE[fase - 1];
  const xpFinFase = esFaseMaxima ? null : UMBRALES_FASE[fase];
  const xpRangoFase = esFaseMaxima ? null : xpFinFase - xpInicioFase;
  const xpEnFaseActual = xpTotal - xpInicioFase;
  const xpParaSiguienteFase = esFaseMaxima ? null : xpFinFase - xpTotal;

  return {
    fase,
    xpInicioFase,
    xpFinFase,
    xpRangoFase,
    xpEnFaseActual,
    xpParaSiguienteFase,
    esFaseMaxima,
  };
};

module.exports = { UMBRALES_FASE, XP_POR_MISION, calcularFase, calcularProgresoFase };