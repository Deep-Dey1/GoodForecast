const axios = require('axios');
const { ApiError } = require('../utils/errors');

const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_URL = 'https://api.openweathermap.org/geo/1.0';
const API_KEY = process.env.OPENWEATHER_API_KEY;

class WeatherService {
  // Get current weather by city name
  async getCurrentWeatherByCity(cityName) {
    try {
      const response = await axios.get(`${BASE_URL}/weather`, {
        params: {
          q: cityName,
          appid: API_KEY,
          units: 'metric' // Use metric for Celsius
        }
      });

      return this.formatWeatherData(response.data);
    } catch (error) {
      this.handleApiError(error);
    }
  }

  // Get current weather by coordinates
  async getCurrentWeatherByCoordinates(lat, lon) {
    try {
      const response = await axios.get(`${BASE_URL}/weather`, {
        params: {
          lat,
          lon,
          appid: API_KEY,
          units: 'metric'
        }
      });

      return this.formatWeatherData(response.data);
    } catch (error) {
      this.handleApiError(error);
    }
  }

  // Get 5-day forecast by city name
  async getForecastByCity(cityName) {
    try {
      const response = await axios.get(`${BASE_URL}/forecast`, {
        params: {
          q: cityName,
          appid: API_KEY,
          units: 'metric'
        }
      });

      return this.formatForecastData(response.data);
    } catch (error) {
      this.handleApiError(error);
    }
  }

  // Search cities for autocomplete
  async searchCities(query) {
    try {
      const response = await axios.get(`${GEO_URL}/direct`, {
        params: {
          q: query,
          limit: 5,
          appid: API_KEY
        }
      });

      return response.data.map(city => ({
        name: city.name,
        country: city.country,
        state: city.state || '',
        lat: city.lat,
        lon: city.lon,
        displayName: city.state 
          ? `${city.name}, ${city.state}, ${city.country}`
          : `${city.name}, ${city.country}`
      }));
    } catch (error) {
      this.handleApiError(error);
    }
  }

  // Get Air Quality Index by coordinates
  async getAirQuality(lat, lon) {
    try {
      const response = await axios.get(`${BASE_URL}/air_pollution`, {
        params: {
          lat,
          lon,
          appid: API_KEY
        }
      });

      return this.formatAirQualityData(response.data);
    } catch (error) {
      this.handleApiError(error);
    }
  }

  // Format Air Quality data
  formatAirQualityData(data) {
    const aqi = data.list[0].main.aqi;
    const components = data.list[0].components;

    // AQI levels: 1 = Good, 2 = Fair, 3 = Moderate, 4 = Poor, 5 = Very Poor
    const aqiLevels = {
      1: { label: 'Good', color: 'green', description: 'Air quality is satisfactory' },
      2: { label: 'Fair', color: 'yellow', description: 'Air quality is acceptable' },
      3: { label: 'Moderate', color: 'orange', description: 'Air quality is moderate' },
      4: { label: 'Poor', color: 'red', description: 'Air quality is unhealthy' },
      5: { label: 'Very Poor', color: 'purple', description: 'Air quality is hazardous' }
    };

    return {
      aqi,
      level: aqiLevels[aqi].label,
      color: aqiLevels[aqi].color,
      description: aqiLevels[aqi].description,
      components: {
        co: components.co.toFixed(2),        // Carbon monoxide (μg/m³)
        no: components.no.toFixed(2),        // Nitrogen monoxide (μg/m³)
        no2: components.no2.toFixed(2),      // Nitrogen dioxide (μg/m³)
        o3: components.o3.toFixed(2),        // Ozone (μg/m³)
        so2: components.so2.toFixed(2),      // Sulphur dioxide (μg/m³)
        pm2_5: components.pm2_5.toFixed(2),  // Fine particles matter (μg/m³)
        pm10: components.pm10.toFixed(2),    // Coarse particulate matter (μg/m³)
        nh3: components.nh3.toFixed(2)       // Ammonia (μg/m³)
      },
      timestamp: new Date(data.list[0].dt * 1000).toISOString()
    };
  }

  // Format current weather data
  formatWeatherData(data) {
    return {
      city: data.name,
      country: data.sys.country,
      coordinates: {
        lat: data.coord.lat,
        lon: data.coord.lon
      },
      weather: {
        main: data.weather[0].main,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        iconUrl: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
      },
      temperature: {
        current: Math.round(data.main.temp),
        feelsLike: Math.round(data.main.feels_like),
        min: Math.round(data.main.temp_min),
        max: Math.round(data.main.temp_max)
      },
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      wind: {
        speed: data.wind.speed,
        deg: data.wind.deg
      },
      clouds: data.clouds.all,
      visibility: data.visibility,
      sunrise: new Date(data.sys.sunrise * 1000).toISOString(),
      sunset: new Date(data.sys.sunset * 1000).toISOString(),
      timezone: data.timezone,
      timestamp: new Date(data.dt * 1000).toISOString()
    };
  }

  // Format forecast data
  formatForecastData(data) {
    const dailyForecasts = {};

    // Group forecasts by day
    data.list.forEach(item => {
      const date = new Date(item.dt * 1000).toISOString().split('T')[0];
      
      if (!dailyForecasts[date]) {
        dailyForecasts[date] = {
          date,
          forecasts: []
        };
      }

      dailyForecasts[date].forecasts.push({
        time: new Date(item.dt * 1000).toISOString(),
        temperature: {
          temp: Math.round(item.main.temp),
          feelsLike: Math.round(item.main.feels_like),
          min: Math.round(item.main.temp_min),
          max: Math.round(item.main.temp_max)
        },
        weather: {
          main: item.weather[0].main,
          description: item.weather[0].description,
          icon: item.weather[0].icon,
          iconUrl: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`
        },
        humidity: item.main.humidity,
        wind: {
          speed: item.wind.speed,
          deg: item.wind.deg
        },
        clouds: item.clouds.all,
        pop: Math.round(item.pop * 100) // Probability of precipitation
      });
    });

    return {
      city: data.city.name,
      country: data.city.country,
      coordinates: {
        lat: data.city.coord.lat,
        lon: data.city.coord.lon
      },
      dailyForecasts: Object.values(dailyForecasts)
    };
  }

  // Handle API errors
  handleApiError(error) {
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data.message || 'Weather API error';

      if (status === 404) {
        throw new ApiError('City not found', 404);
      } else if (status === 401) {
        throw new ApiError('Invalid API key. Please check your configuration.', 401);
      } else if (status === 429) {
        throw new ApiError('Too many requests. Please try again later.', 429);
      } else {
        throw new ApiError(message, status);
      }
    } else if (error.request) {
      throw new ApiError('Unable to reach weather service. Please check your connection.', 503);
    } else {
      throw new ApiError(error.message, 500);
    }
  }
}

module.exports = new WeatherService();
