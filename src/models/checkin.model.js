const { db } = require('../config/firebase');

const getCheckinRef = (uid, fecha) => {
  return db.collection('users').doc(uid).collection('checkins').doc(fecha);
};

const createCheckin = async (uid, fecha, checkinData) => {
  const ref = getCheckinRef(uid, fecha);
  await ref.set(checkinData);
  return { id: fecha, ...checkinData };
};

const getCheckinByDate = async (uid, fecha) => {
  const doc = await getCheckinRef(uid, fecha).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() };
};

const getCheckinHistory = async (uid, limit = 30) => {
  const snapshot = await db
    .collection('users')
    .doc(uid)
    .collection('checkins')
    .orderBy('fecha', 'desc')
    .limit(limit)
    .get();

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

module.exports = { createCheckin, getCheckinByDate, getCheckinHistory };