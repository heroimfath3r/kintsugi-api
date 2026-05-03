const { db } = require('../config/firebase');

const getMisionRef = (uid, fecha) => {
  return db.collection('users').doc(uid).collection('misiones').doc(fecha);
};

const createMision = async (uid, fecha, misionData) => {
  const ref = getMisionRef(uid, fecha);
  await ref.set(misionData);
  return { id: fecha, ...misionData };
};

const getMisionByDate = async (uid, fecha) => {
  const doc = await getMisionRef(uid, fecha).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() };
};

const updateMision = async (uid, misionId, data) => {
  const ref = getMisionRef(uid, misionId);
  await ref.update(data);
};

const getMisionHistory = async (uid, limit = 30) => {
  const snapshot = await db
    .collection('users')
    .doc(uid)
    .collection('misiones')
    .orderBy('fecha', 'desc')
    .limit(limit)
    .get();

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// Busca misiones del catálogo global por arquetipo y estado emocional
const getMisionFromCatalog = async (arquetipo, estadoEmocional) => {
  const snapshot = await db
    .collection('catalogo_misiones')
    .where('arquetipo', '==', arquetipo)
    .where('estadoEmocional', '==', estadoEmocional)
    .limit(1)
    .get();

  if (snapshot.empty) return null;

  const doc = snapshot.docs[0];
  return { id: doc.id, ...doc.data() };
};

module.exports = { createMision, getMisionByDate, updateMision, getMisionHistory, getMisionFromCatalog };