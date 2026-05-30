// C:\Proyectos\Kintsugi-api\src\config\gamificacion.js

/**
 * Configuracion central de gamificacion.
 * Cualquier cambio de balanceo (umbrales, XP por mision, fases) se hace aqui.
 */

// Umbrales acumulativos de XP para cada fase.
// Fase 1: 0-99 XP | Fase 2: 100-199 XP | Fase 3: 200+ XP
const UMBRALES_FASE = [0, 100, 200];

// XP otorgado al completar una mision diaria.
const XP_POR_MISION = 25;

/**
 * Calcula la fase actual segun el XP total acumulado.
 * @param {number} xpTotal
 * @returns {number} fase (1, 2 o 3)
 */
function calcularFase(xpTotal) {
  if (xpTotal >= UMBRALES_FASE[2]) return 3;
  if (xpTotal >= UMBRALES_FASE[1]) return 2;
  return 1;
}

/**
 * Devuelve los datos de progreso dentro de la fase actual.
 * Modelo A: XP acumulativo, la barra muestra avance DENTRO de la fase.
 *
 * @param {number} xpTotal - XP total del usuario.
 * @returns {{
 *   fase: number,
 *   xpInicioFase: number,
 *   xpFinFase: number | null,
 *   xpEnFaseActual: number,
 *   xpParaSiguienteFase: number | null,
 *   xpRangoFase: number | null,
 *   esFaseMaxima: boolean
 * }}
 */
function calcularProgresoFase(xpTotal) {
  const fase = calcularFase(xpTotal);
  const xpInicioFase = UMBRALES_FASE[fase - 1];
  const esFaseMaxima = fase >= UMBRALES_FASE.length;
  const xpFinFase = esFaseMaxima ? null : UMBRALES_FASE[fase];

  const xpEnFaseActual = xpTotal - xpInicioFase;
  const xpRangoFase = esFaseMaxima ? null : (xpFinFase - xpInicioFase);
  const xpParaSiguienteFase = esFaseMaxima ? null : (xpFinFase - xpTotal);

  return {
    fase,
    xpInicioFase,
    xpFinFase,
    xpEnFaseActual,
    xpParaSiguienteFase,
    xpRangoFase,
    esFaseMaxima,
  };
}

module.exports = {
  UMBRALES_FASE,
  XP_POR_MISION,
  calcularFase,
  calcularProgresoFase,
};