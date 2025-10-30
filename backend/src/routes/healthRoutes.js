const express = require('express');
const router = express.Router();

// Health check endpoint
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Weather API is running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Readiness check (for container orchestration)
router.get('/ready', (req, res) => {
  const apiKeyConfigured = !!process.env.OPENWEATHER_API_KEY && 
                           process.env.OPENWEATHER_API_KEY !== 'your_api_key_here';
  
  if (apiKeyConfigured) {
    res.status(200).json({
      success: true,
      message: 'Service is ready',
      ready: true
    });
  } else {
    res.status(503).json({
      success: false,
      message: 'Service not ready - API key not configured',
      ready: false
    });
  }
});

module.exports = router;
