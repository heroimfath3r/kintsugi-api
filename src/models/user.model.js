const { db } = require('../config/firebase');

const COLLECTION = 'users';

const createUser = async (uid, userData) => {
  await db.collection(COLLECTION).doc(uid).set(userData);
  return { uid, ...userData };
};

const getUserById = async (uid) => {
  const doc = await db.collection(COLLECTION).doc(uid).get();
  if (!doc.exists) return null;
  return { uid, ...doc.data() };
};

const updateUser = async (uid, data) => {
  await db.collection(COLLECTION).doc(uid).update(data);
  return { uid, ...data };
};

module.exports = { createUser, getUserById, updateUser };