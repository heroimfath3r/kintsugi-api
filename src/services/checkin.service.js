const checkinModel = require('../models/checkin.model');

const ESTADOS_VALIDOS = ['frustracion', 'vacio', 'motivacion', 'calma', 'ansiedad'];

const registrarCheckin = async (uid, estadoEmocional) => {
  // Validar estado emocional
  if (!estadoEmocional || !ESTADOS_VALIDOS.includes(estadoEmocional)) {
    throw {
      status: 400,
      message: 'Estado emocional inválido',
      estadosValidos: ESTADOS_VALIDOS,
    };
  }

  // Verificar si ya hizo check-in hoy
  const hoy = new Date().toISOString().split('T')[0];
  const existente = await checkinModel.getCheckinByDate(uid, hoy);

  if (existente) {
    throw { status: 400, message: 'Ya realizaste tu check-in de hoy' };
  }

  // Crear el check-in
  const checkinData = {
    estadoEmocional,
    fecha: new Date().toISOString(),
    creadoEn: new Date().toISOString(),
  };

  return await checkinModel.createCheckin(uid, hoy, checkinData);
};

const obtenerHistorial = async (uid) => {
  return await checkinModel.getCheckinHistory(uid);
};

const obtenerCheckinHoy = async (uid) => {
  const hoy = new Date().toISOString().split('T')[0];
  const checkin = await checkinModel.getCheckinByDate(uid, hoy);

  return {
    hasCheckin: !!checkin,
    checkin,
  };
};

module.exports = { registrarCheckin, obtenerHistorial, obtenerCheckinHoy };