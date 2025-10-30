const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');
const { validateCityName, validateCoordinates } = require('../middleware/validation');

// Get weather by city name
router.get('/city/:cityName', validateCityName, weatherController.getWeatherByCity);

// Get weather by coordinates
router.get('/coordinates', validateCoordinates, weatherController.getWeatherByCoordinates);

// Get 5-day forecast by city name
router.get('/forecast/:cityName', validateCityName, weatherController.getForecastByCity);

// Get air quality by coordinates
router.get('/air-quality', validateCoordinates, weatherController.getAirQuality);

// Search cities (autocomplete)
router.get('/search/:query', weatherController.searchCities);

module.exports = router;
