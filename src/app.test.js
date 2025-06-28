const request = require('supertest');
const app = require('./app.js');

describe('API Endpoints', () => {
  it('GET /health should return healthy', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ status: 'healthy' });
  });

  it('GET /api/welcome should return welcome message', async () => {
    const res = await request(app).get('/api/welcome');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message');
  });

  it('GET /massage should return massage message', async () => {
    const res = await request(app).get('/massage');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message');
  });
});
