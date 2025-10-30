import axios from 'axios';

// Use relative URL in production, localhost in development
const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.MODE === 'production' ? '/api' : 'http://localhost:5000/api');

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Weather API functions
export const weatherAPI = {
  // Get current weather by city name
  getWeatherByCity: async (cityName) => {
    const response = await api.get(`/weather/city/${cityName}`);
    return response.data; // Returns { success: true, data: weatherData }
  },

  // Get weather by coordinates
  getWeatherByCoordinates: async (lat, lon) => {
    const response = await api.get(`/weather/coordinates`, {
      params: { lat, lon },
    });
    return response.data;
  },

  // Get 5-day forecast
  getForecast: async (cityName) => {
    const response = await api.get(`/weather/forecast/${cityName}`);
    return response.data; // Returns { success: true, data: forecastData }
  },

  // Search cities
  searchCities: async (query) => {
    const response = await api.get(`/weather/search/${query}`);
    return response.data;
  },

  // Get air quality
  getAirQuality: async (lat, lon) => {
    const response = await api.get(`/weather/air-quality`, {
      params: { lat, lon },
    });
    return response.data;
  },

  // Health check
  healthCheck: async () => {
    const response = await api.get('/health');
    return response.data;
  },
};

// Error handling interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error
      throw new Error(error.response.data.message || 'Something went wrong');
    } else if (error.request) {
      // Request made but no response
      throw new Error('Unable to reach the server. Please check your connection.');
    } else {
      // Something else happened
      throw new Error(error.message || 'An unexpected error occurred');
    }
  }
);

export default api;
