const request = require('supertest');
const app = require('../src/server');

describe('Health Check Endpoints', () => {
  describe('GET /api/health', () => {
    it('should return 200 and service status', async () => {
      const response = await request(app)
        .get('/api/health')
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('timestamp');
      expect(response.body).toHaveProperty('uptime');
    });
  });

  describe('GET /api/health/ready', () => {
    it('should check if service is ready', async () => {
      const response = await request(app)
        .get('/api/health/ready');

      expect(response.body).toHaveProperty('success');
      expect(response.body).toHaveProperty('ready');
    });
  });
});
