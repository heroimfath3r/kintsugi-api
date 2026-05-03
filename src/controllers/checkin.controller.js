const { db } = require('../config/firebase');

const createCheckin = async (req, res) => {
  try {
    const { uid } = req.user;
    const { estadoEmocional } = req.body;

    const estadosValidos = ['frustracion', 'vacio', 'motivacion', 'calma', 'ansiedad'];

    if (!estadoEmocional || !estadosValidos.includes(estadoEmocional)) {
      return res.status(400).json({
        error: 'Estado emocional inválido',
        estadosValidos,
      });
    }

    // Usar la fecha de hoy como ID para evitar duplicados
    const hoy = new Date().toISOString().split('T')[0];

    const checkinRef = db
      .collection('users')
      .doc(uid)
      .collection('checkins')
      .doc(hoy);

    // Verificar si ya hizo check-in hoy
    const existing = await checkinRef.get();
    if (existing.exists) {
      return res.status(400).json({ error: 'Ya realizaste tu check-in de hoy' });
    }

    const checkinData = {
      estadoEmocional,
      fecha: new Date().toISOString(),
      creadoEn: new Date().toISOString(),
    };

    await checkinRef.set(checkinData);

    res.status(201).json({
      message: 'Check-in registrado',
      checkin: { id: hoy, ...checkinData },
    });
  } catch (error) {
    console.error('Error en createCheckin:', error.message);
    res.status(500).json({ error: 'Error al registrar el check-in' });
  }
};

const getHistory = async (req, res) => {
  try {
    const { uid } = req.user;

    const snapshot = await db
      .collection('users')
      .doc(uid)
      .collection('checkins')
      .orderBy('fecha', 'desc')
      .limit(30)
      .get();

    const checkins = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json({ checkins });
  } catch (error) {
    console.error('Error en getHistory:', error.message);
    res.status(500).json({ error: 'Error al obtener historial' });
  }
};

const getToday = async (req, res) => {
  try {
    const { uid } = req.user;
    const hoy = new Date().toISOString().split('T')[0];

    const checkinDoc = await db
      .collection('users')
      .doc(uid)
      .collection('checkins')
      .doc(hoy)
      .get();

    if (!checkinDoc.exists) {
      return res.json({ hasCheckin: false, checkin: null });
    }

    res.json({
      hasCheckin: true,
      checkin: { id: hoy, ...checkinDoc.data() },
    });
  } catch (error) {
    console.error('Error en getToday:', error.message);
    res.status(500).json({ error: 'Error al verificar check-in de hoy' });
  }
};

module.exports = { createCheckin, getHistory, getToday };