const { db } = require('../config/firebase');

const register = async (req, res) => {
  try {
    const { uid, email } = req.user;

    // Verificar si el usuario ya existe en Firestore
    const userDoc = await db.collection('users').doc(uid).get();

    if (userDoc.exists) {
      return res.status(400).json({ error: 'El usuario ya tiene un perfil creado' });
    }

    // Crear perfil en Firestore
    const userData = {
      email,
      arquetipo: null,
      creadoEn: new Date().toISOString(),
      racha: 0,
      misionesCompletadas: 0,
      xp: 0,
      fase: 1,
    };

    await db.collection('users').doc(uid).set(userData);

    res.status(201).json({
      message: 'Perfil creado exitosamente',
      user: { uid, ...userData },
    });
  } catch (error) {
    console.error('Error en register:', error.message);
    res.status(500).json({ error: 'Error al crear el perfil' });
  }
};

const getProfile = async (req, res) => {
  try {
    const { uid } = req.user;

    const userDoc = await db.collection('users').doc(uid).get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: 'Perfil no encontrado' });
    }

    res.json({ user: { uid, ...userDoc.data() } });
  } catch (error) {
    console.error('Error en getProfile:', error.message);
    res.status(500).json({ error: 'Error al obtener el perfil' });
  }
};

const updateArchetype = async (req, res) => {
  try {
    const { uid } = req.user;
    const { arquetipo } = req.body;

    const arquetiposValidos = ['thorfinn', 'rock_lee', 'ippo', 'mob', 'asta'];

    if (!arquetipo || !arquetiposValidos.includes(arquetipo)) {
      return res.status(400).json({
        error: 'Arquetipo inválido',
        arquetiposValidos,
      });
    }

    await db.collection('users').doc(uid).update({ arquetipo });

    res.json({ message: 'Arquetipo actualizado', arquetipo });
  } catch (error) {
    console.error('Error en updateArchetype:', error.message);
    res.status(500).json({ error: 'Error al actualizar el arquetipo' });
  }
};

module.exports = { register, getProfile, updateArchetype };