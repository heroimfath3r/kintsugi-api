const request = require('supertest');
const app = require('../src/app');

describe('API Health Check', () => {
  test('GET /api/health debe responder con status ok', async () => {
    const response = await request(app).get('/api/health');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', 'ok');
    expect(response.body).toHaveProperty('message', 'Kintsugi API funcionando');
  });
});

describe('Rutas no encontradas', () => {
  test('GET /ruta/inexistente debe responder con 404', async () => {
    const response = await request(app).get('/ruta/inexistente');

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error', 'Ruta no encontrada');
  });
});

describe('API responde JSON', () => {
  test('GET /api/health debe devolver content-type JSON', async () => {
    const response = await request(app).get('/api/health');

    expect(response.headers['content-type']).toMatch(/json/);
  });
});