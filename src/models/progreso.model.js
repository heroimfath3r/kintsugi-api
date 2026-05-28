//C:\Proyectos\Kintsugi-api\src\models\progreso.model.js
const { db } = require('../config/firebase');

const getUserProgress = async (uid) => {
  const doc = await db.collection('users').doc(uid).get();
  if (!doc.exists) return null;

  const data = doc.data();
  return {
    uid,
    arquetipo: data.arquetipo,
    xp: data.xp || 0,
    fase: data.fase || 1,
    racha: data.racha || 0,
    misionesCompletadas: data.misionesCompletadas || 0,
  };
};

const getWeeklyCheckins = async (uid) => {
  const hoy = new Date();
  const hace7dias = new Date(hoy);
  hace7dias.setDate(hoy.getDate() - 7);

  const snapshot = await db
    .collection('users')
    .doc(uid)
    .collection('checkins')
    .where('fecha', '>=', hace7dias.toISOString())
    .orderBy('fecha', 'desc')
    .get();

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

const getWeeklyMissions = async (uid) => {
  const hoy = new Date();
  const hace7dias = new Date(hoy);
  hace7dias.setDate(hoy.getDate() - 7);

  const snapshot = await db
    .collection('users')
    .doc(uid)
    .collection('misiones')
    .where('fecha', '>=', hace7dias.toISOString())
    .orderBy('fecha', 'desc')
    .get();

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
const getCatalogoHitos = async () => {
  const snapshot = await db
    .collection('catalogo_hitos')
    .orderBy('orden', 'asc')
    .get();

  return snapshot.docs.map((doc) => doc.data());
};
module.exports = { getUserProgress, getWeeklyCheckins, getWeeklyMissions, getCatalogoHitos };