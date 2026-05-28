const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const authRoutes = require('./routes/auth.routes');
const checkinRoutes = require('./routes/checkin.routes');
const misionesRoutes = require('./routes/misiones.routes');
const progresoRoutes = require('./routes/progreso.routes');

const app = express();
// Bug #47: Deshabilitar cabecera X-Powered-By para no revelar el framework
app.disable('x-powered-by');

// Rate limiting general — máximo 100 peticiones por IP cada 15 minutos
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Demasiadas peticiones, intenta de nuevo en 15 minutos.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiting estricto para auth — máximo 10 intentos por IP cada 15 minutos
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: 'Demasiados intentos de autenticación, intenta de nuevo en 15 minutos.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Middleware global
// Bug #45: Restringir CORS a orígenes específicos en lugar de aceptar cualquiera
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:8080'],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(generalLimiter);

// Ruta de salud — para verificar que la API está viva
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Kintsugi API funcionando' });
});

// Rutas
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/checkin', checkinRoutes);
app.use('/api/misiones', misionesRoutes);
app.use('/api/progreso', progresoRoutes);

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Manejo global de errores
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: 'Error interno del servidor' });
});

module.exports = app;