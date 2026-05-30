const UMBRALES_FASE = [0, 100, 200];
const XP_POR_MISION = 25;

function calcularFase(xpTotal) {
  if (xpTotal >= UMBRALES_FASE[2]) return 3;
  if (xpTotal >= UMBRALES_FASE[1]) return 2;
  return 1;
}

function calcularProgresoFase(xpTotal) {
  const fase = calcularFase(xpTotal);
  const xpInicioFase = UMBRALES_FASE[fase - 1];
  const esFaseMaxima = fase >= UMBRALES_FASE.length;
  const xpFinFase = esFaseMaxima ? null : UMBRALES_FASE[fase];
  const xpEnFaseActual = xpTotal - xpInicioFase;
  const xpRangoFase = esFaseMaxima ? null : (xpFinFase - xpInicioFase);
  const xpParaSiguienteFase = esFaseMaxima ? null : (xpFinFase - xpTotal);
  return { fase, xpInicioFase, xpFinFase, xpEnFaseActual, xpParaSiguienteFase, xpRangoFase, esFaseMaxima };
}

module.exports = { UMBRALES_FASE, XP_POR_MISION, calcularFase, calcularProgresoFase };
