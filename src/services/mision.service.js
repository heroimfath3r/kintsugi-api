const misionModel = require('../models/mision.model');
const userModel = require('../models/user.model');
const checkinModel = require('../models/checkin.model');

const obtenerMisionDiaria = async (uid) => {
  const hoy = new Date().toISOString().split('T')[0];

  // Verificar si ya tiene misión asignada hoy
  const misionExistente = await misionModel.getMisionByDate(uid, hoy);
  if (misionExistente) {
    return misionExistente;
  }

  // Obtener perfil para saber el arquetipo
  const user = await userModel.getUserById(uid);
  if (!user) {
    throw { status: 404, message: 'Perfil no encontrado' };
  }

  if (!user.arquetipo) {
    throw { status: 400, message: 'No tienes un arquetipo asignado. Completa el test primero.' };
  }

  // Obtener check-in de hoy para saber el estado emocional
  const checkin = await checkinModel.getCheckinByDate(uid, hoy);
  if (!checkin) {
    throw { status: 400, message: 'Realiza tu check-in emocional primero' };
  }

  // Buscar misión en el catálogo de Firestore
  const misionTemplate = await misionModel.getMisionFromCatalog(
    user.arquetipo,
    checkin.estadoEmocional
  );

  if (!misionTemplate) {
    throw { status: 500, message: 'No se encontró misión para esta combinación' };
  }

  // Crear la misión del día para el usuario
  const misionData = {
    titulo: misionTemplate.titulo,
    tipo: misionTemplate.tipo,
    descripcion: misionTemplate.descripcion,
    estadoEmocional: checkin.estadoEmocional,
    arquetipo: user.arquetipo,
    completada: false,
    fecha: new Date().toISOString(),
  };

  return await misionModel.createMision(uid, hoy, misionData);
};

const completarMision = async (uid, misionId) => {
  // Verificar que la misión existe
  const mision = await misionModel.getMisionByDate(uid, misionId);
  if (!mision) {
    throw { status: 404, message: 'Misión no encontrada' };
  }

  if (mision.completada) {
    throw { status: 400, message: 'Esta misión ya fue completada' };
  }

  // Marcar como completada
  await misionModel.updateMision(uid, misionId, {
    completada: true,
    completadaEn: new Date().toISOString(),
  });

  // Actualizar progreso del usuario
  const user = await userModel.getUserById(uid);
  const nuevasMisionesCompletadas = (user.misionesCompletadas || 0) + 1;
  const nuevoXp = (user.xp || 0) + 25;
  const nuevaFase = nuevoXp >= 200 ? 3 : nuevoXp >= 100 ? 2 : 1;
  const nuevaRacha = (user.racha || 0) + 1;

  await userModel.updateUser(uid, {
    misionesCompletadas: nuevasMisionesCompletadas,
    xp: nuevoXp,
    fase: nuevaFase,
    racha: nuevaRacha,
  });

  return {
    message: 'Misión completada',
    progreso: {
      misionesCompletadas: nuevasMisionesCompletadas,
      xp: nuevoXp,
      fase: nuevaFase,
      racha: nuevaRacha,
    },
  };
};

const obtenerHistorial = async (uid) => {
  return await misionModel.getMisionHistory(uid);
};

module.exports = { obtenerMisionDiaria, completarMision, obtenerHistorial };