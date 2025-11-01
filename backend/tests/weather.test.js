const request = require('supertest');
const app = require('../src/server');

describe('Weather API Endpoints', () => {
  describe('GET /api/weather/city/:cityName', () => {
    it('should return 400 for invalid city name', async () => {
      const response = await request(app)
        .get('/api/weather/city/123')
        .expect(400);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('message');
    });

    it('should return 400 for city name with special characters', async () => {
      const response = await request(app)
        .get('/api/weather/city/Test@#$%City')
        .expect(400);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body.message).toContain('invalid characters');
    });
  });

  describe('GET /api/weather/coordinates', () => {
    it('should return 400 for missing coordinates', async () => {
      const response = await request(app)
        .get('/api/weather/coordinates')
        .expect(400);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body.message).toContain('required');
    });

    it('should return 400 for invalid latitude', async () => {
      const response = await request(app)
        .get('/api/weather/coordinates?lat=100&lon=50')
        .expect(400);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body.message).toContain('Latitude');
    });

    it('should return 400 for invalid longitude', async () => {
      const response = await request(app)
        .get('/api/weather/coordinates?lat=50&lon=200')
        .expect(400);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body.message).toContain('Longitude');
    });
  });

  describe('GET /api/weather/forecast/:cityName', () => {
    it('should return 400 for city name that is too short', async () => {
      const response = await request(app)
        .get('/api/weather/forecast/a')
        .expect(400);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body.message).toContain('at least 2 characters');
    });
  });
});
