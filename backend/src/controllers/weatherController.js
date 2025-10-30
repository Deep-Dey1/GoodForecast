const weatherService = require('../services/weatherService');

class WeatherController {
  // Get current weather by city name
  async getWeatherByCity(req, res, next) {
    try {
      const { cityName } = req.params;
      const weather = await weatherService.getCurrentWeatherByCity(cityName);
      
      res.status(200).json({
        success: true,
        data: weather
      });
    } catch (error) {
      next(error);
    }
  }

  // Get current weather by coordinates
  async getWeatherByCoordinates(req, res, next) {
    try {
      const { lat, lon } = req.query;
      const weather = await weatherService.getCurrentWeatherByCoordinates(lat, lon);
      
      res.status(200).json({
        success: true,
        data: weather
      });
    } catch (error) {
      next(error);
    }
  }

  // Get 5-day forecast by city name
  async getForecastByCity(req, res, next) {
    try {
      const { cityName } = req.params;
      const forecast = await weatherService.getForecastByCity(cityName);
      
      res.status(200).json({
        success: true,
        data: forecast
      });
    } catch (error) {
      next(error);
    }
  }

  // Search cities (for autocomplete)
  async searchCities(req, res, next) {
    try {
      const { query } = req.params;
      const cities = await weatherService.searchCities(query);
      
      res.status(200).json({
        success: true,
        data: cities
      });
    } catch (error) {
      next(error);
    }
  }

  // Get air quality by coordinates
  async getAirQuality(req, res, next) {
    try {
      const { lat, lon } = req.query;
      const airQuality = await weatherService.getAirQuality(lat, lon);
      
      res.status(200).json({
        success: true,
        data: airQuality
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new WeatherController();
