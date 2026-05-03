const userModel = require('../models/user.model');

const ARQUETIPOS_VALIDOS = ['thorfinn', 'rock_lee', 'ippo', 'mob', 'asta'];

const registerUser = async (uid, email) => {
  // Verificar si ya existe
  const existingUser = await userModel.getUserById(uid);
  if (existingUser) {
    throw { status: 400, message: 'El usuario ya tiene un perfil creado' };
  }

  // Crear perfil con datos iniciales
  const userData = {
    email,
    arquetipo: null,
    creadoEn: new Date().toISOString(),
    racha: 0,
    misionesCompletadas: 0,
    xp: 0,
    fase: 1,
  };

  return await userModel.createUser(uid, userData);
};

const getProfile = async (uid) => {
  const user = await userModel.getUserById(uid);
  if (!user) {
    throw { status: 404, message: 'Perfil no encontrado' };
  }
  return user;
};

const updateArchetype = async (uid, arquetipo) => {
  if (!arquetipo || !ARQUETIPOS_VALIDOS.includes(arquetipo)) {
    throw {
      status: 400,
      message: 'Arquetipo inválido',
      arquetiposValidos: ARQUETIPOS_VALIDOS,
    };
  }

  // Verificar que el usuario existe
  const user = await userModel.getUserById(uid);
  if (!user) {
    throw { status: 404, message: 'Perfil no encontrado' };
  }

  await userModel.updateUser(uid, { arquetipo });
  return { arquetipo };
};

module.exports = { registerUser, getProfile, updateArchetype };