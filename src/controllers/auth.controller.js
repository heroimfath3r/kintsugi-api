const authService = require('../services/auth.service');

const register = async (req, res) => {
  try {
    const { uid, email } = req.user;
    const user = await authService.registerUser(uid, email);
    res.status(201).json({ message: 'Perfil creado exitosamente', user });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ error: error.message || 'Error al crear el perfil' });
  }
};

const getProfile = async (req, res) => {
  try {
    const { uid } = req.user;
    const user = await authService.getProfile(uid);
    res.json({ user });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ error: error.message || 'Error al obtener el perfil' });
  }
};

const updateArchetype = async (req, res) => {
  try {
    const { uid } = req.user;
    const { arquetipo } = req.body;
    const result = await authService.updateArchetype(uid, arquetipo);
    res.json({ message: 'Arquetipo actualizado', ...result });
  } catch (error) {
    const status = error.status || 500;
    const response = { error: error.message || 'Error al actualizar el arquetipo' };
    if (error.arquetiposValidos) response.arquetiposValidos = error.arquetiposValidos;
    res.status(status).json(response);
  }
};

module.exports = { register, getProfile, updateArchetype };