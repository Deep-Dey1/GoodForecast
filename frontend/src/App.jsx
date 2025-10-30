import { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import WeatherCard from './components/WeatherCard';
import ForecastCard from './components/ForecastCard';
import ErrorMessage from './components/ErrorMessage';
import WaveBackground from './components/WaveBackground';
import WeatherMap from './components/WeatherMap';
import AirQualityCard from './components/AirQualityCard';
import { weatherAPI } from './services/api';

function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [airQuality, setAirQuality] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const [theme, setTheme] = useState(() => {
    // Check if user has manually set theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;
    
    // Auto-detect based on time (7PM to 6AM = dark mode)
    const hour = new Date().getHours();
    return (hour >= 19 || hour < 6) ? 'dark' : 'light';
  });

  // Fetch user's location or default to New York City
  const fetchInitialWeather = async () => {
    if (initialLoadComplete) return;
    
    setLoading(true);
    
    // Try to get user's location
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            console.log('User location:', latitude, longitude);
            await handleMapLocationClick(latitude, longitude);
            setInitialLoadComplete(true);
          } catch (err) {
            console.warn('Failed to fetch weather for user location, using default');
            await handleSearch('New York City');
            setInitialLoadComplete(true);
          }
        },
        async (err) => {
          console.warn('Geolocation denied or failed, using default city');
          await handleSearch('New York City');
          setInitialLoadComplete(true);
        },
        { timeout: 5000 }
      );
    } else {
      // Geolocation not supported, use default
      console.log('Geolocation not supported, using default city');
      await handleSearch('New York City');
      setInitialLoadComplete(true);
    }
  };

  const handleSearch = async (cityName) => {
    setLoading(true);
    setError(null);
    
    // Store current data in case search fails
    const currentWeather = weather;
    const currentForecast = forecast;
    const currentAirQuality = airQuality;

    try {
      console.log('Searching for:', cityName);
      const weatherResponse = await weatherAPI.getWeatherByCity(cityName);
      console.log('Weather Response:', weatherResponse);
      
      if (weatherResponse.success && weatherResponse.data) {
        setWeather(weatherResponse.data);
        console.log('Weather data set:', weatherResponse.data);

        // Fetch air quality for the coordinates
        const { lat, lon } = weatherResponse.data.coordinates;
        try {
          const aqiResponse = await weatherAPI.getAirQuality(lat, lon);
          console.log('AQI Response:', aqiResponse);
          if (aqiResponse.success && aqiResponse.data) {
            setAirQuality(aqiResponse.data);
          }
        } catch (aqiErr) {
          console.warn('Could not fetch air quality:', aqiErr);
        }

        const forecastResponse = await weatherAPI.getForecast(cityName);
        console.log('Forecast Response:', forecastResponse);
        
        if (forecastResponse.success && forecastResponse.data) {
          setForecast(forecastResponse.data);
          console.log('Forecast data set:', forecastResponse.data);
        }
      } else {
        // If weather fetch failed, restore previous data
        setWeather(currentWeather);
        setForecast(currentForecast);
        setAirQuality(currentAirQuality);
        toast.error('City not found. Please check the spelling and try again.', {
          duration: 2000,
          position: 'top-center',
          style: {
            background: theme === 'light' ? '#ffffff' : '#1f2937',
            color: theme === 'light' ? '#1f2937' : '#fff',
            padding: '16px',
            borderRadius: '10px',
            border: theme === 'light' ? '2px solid #e5e7eb' : 'none',
          },
          icon: '🌍',
        });
      }
    } catch (err) {
      // On error, restore previous data and show error
      setWeather(currentWeather);
      setForecast(currentForecast);
      setAirQuality(currentAirQuality);
      toast.error('City not found. Please check the spelling and try again.', {
        duration: 2000,
        position: 'top-center',
        style: {
          background: theme === 'light' ? '#ffffff' : '#1f2937',
          color: theme === 'light' ? '#1f2937' : '#fff',
          padding: '16px',
          borderRadius: '10px',
          border: theme === 'light' ? '2px solid #e5e7eb' : 'none',
        },
        icon: '🌍',
      });
      console.error('Error fetching weather:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleMapLocationClick = async (lat, lon) => {
    setLoading(true);
    setError(null);

    try {
      console.log('Fetching weather for coordinates:', lat, lon);
      
      // Get weather by coordinates
      const weatherResponse = await weatherAPI.getWeatherByCoordinates(lat, lon);
      console.log('Weather Response (coordinates):', weatherResponse);
      
      if (weatherResponse.success && weatherResponse.data) {
        setWeather(weatherResponse.data);
        
        // Fetch air quality for the coordinates
        try {
          const aqiResponse = await weatherAPI.getAirQuality(lat, lon);
          if (aqiResponse.success && aqiResponse.data) {
            setAirQuality(aqiResponse.data);
          }
        } catch (aqiErr) {
          console.warn('Could not fetch air quality:', aqiErr);
        }

        // Try to get forecast for the city name from the weather response
        try {
          const forecastResponse = await weatherAPI.getForecast(weatherResponse.data.city);
          if (forecastResponse.success && forecastResponse.data) {
            setForecast(forecastResponse.data);
          }
        } catch (forecastErr) {
          console.warn('Could not fetch forecast for this location:', forecastErr);
          // Don't set error, just continue without forecast
        }
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data for this location');
      console.error('Error fetching weather by coordinates:', err);
    } finally {
      setLoading(false);
    }
  };

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Toggle theme function
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  // Fetch initial weather when landing page completes
  useEffect(() => {
    if (!showLanding && !initialLoadComplete) {
      fetchInitialWeather();
    }
  }, [showLanding]);

  return (
    <>
      <Toaster />
      
      {/* Radial Gradient Dot Pattern Background */}
      <div className={`fixed top-0 -z-10 h-screen w-screen ${
        theme === 'light' 
          ? 'bg-[#f3f4f6] bg-[radial-gradient(rgba(156,163,175,0.3)_2px,transparent_2px)]' 
          : 'bg-[#000000] bg-[radial-gradient(rgba(255,255,255,0.15)_2px,transparent_2px)]'
      } bg-[size:20px_20px]`}></div>
      
      {/* Landing Page Animation */}
      {showLanding && (
        <LandingPage onAnimationComplete={() => setShowLanding(false)} theme={theme} />
      )}

      {/* Main App */}
      {!showLanding && (
        <>
          {/* Navbar */}
          <Navbar 
            onSearch={handleSearch} 
            loading={loading} 
            showSearch={!showLanding}
            currentCity={weather ? `${weather.city}, ${weather.country}` : ''}
            weather={weather}
            theme={theme}
            onToggleTheme={toggleTheme}
          />

          {/* Main Content - Desktop: Fixed Grid Layout, Mobile: Scrollable Column */}
          <div className="lg:fixed lg:inset-0 lg:pt-[120px] lg:pb-12 pt-[110px] sm:pt-[105px] md:pt-[100px] pb-4">
            <div className="h-full w-full px-4 sm:px-6 lg:px-8">
              
              {/* Error Message */}
              {error && (
                <div className="mb-4">
                  <ErrorMessage message={error} onClose={() => setError(null)} />
                </div>
              )}

              {/* Desktop Layout: Left (Map Full Height) | Right (Top: Forecast, Bottom: AQI) */}
              {/* Mobile Layout: Column (Map, Forecast, AQI stacked) */}
              <div className="h-full flex flex-col lg:grid lg:grid-cols-2 gap-3 lg:gap-4 lg:items-start">
                
                {/* LEFT SECTION - Map (Full Height on Desktop) */}
                <div className="h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-full min-h-0 lg:self-stretch">
                  {weather ? (
                    <WeatherMap weather={weather} onLocationClick={handleMapLocationClick} />
                  ) : (
                    <div className="card h-full flex items-center justify-center">
                      <div className="text-center p-6 md:p-12">
                        <div className="text-4xl md:text-6xl mb-4">
                          <span className="loading loading-spinner loading-lg"></span>
                        </div>
                        <h3 className="text-lg md:text-xl font-bold text-base-content/70 mb-2">
                          Loading weather data...
                        </h3>
                        <p className="text-base-content/50 text-xs md:text-sm">
                          Getting your location
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* RIGHT SECTION - Divided into Top (Forecast) and Bottom (AQI) */}
                <div className="flex flex-col gap-3 lg:gap-4 h-auto lg:h-full min-h-0 lg:self-stretch">
                  
                  {/* TOP RIGHT - Forecast (50% height on desktop) */}
                  <div className="lg:flex-1 min-h-[300px] lg:min-h-0">
                    {forecast ? (
                      <ForecastCard forecast={forecast} compact={true} />
                    ) : (
                      <div className="card h-full flex items-center justify-center bg-base-100">
                        <div className="text-center p-8">
                          <span className="loading loading-spinner loading-lg"></span>
                          <h3 className="text-lg font-bold text-base-content/70 mt-4">
                            Loading forecast...
                          </h3>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* BOTTOM RIGHT - AQI (50% height on desktop) */}
                  <div className="lg:flex-1 min-h-[250px] lg:min-h-0">
                    {airQuality ? (
                      <AirQualityCard airQuality={airQuality} compact={true} />
                    ) : (
                      <div className="card h-full flex items-center justify-center bg-base-100">
                        <div className="text-center p-6">
                          <span className="loading loading-spinner loading-md"></span>
                          <h3 className="text-base font-bold text-base-content/70 mt-3">
                            Loading air quality...
                          </h3>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer - Sticky at bottom on mobile, fixed on desktop */}
          <footer className="lg:fixed relative bottom-0 left-0 right-0 py-3 text-center z-10 bg-transparent">
            <a
              href="https://github.com/Deep-Dey1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-light transition-all duration-300"
              style={{
                color: theme === 'light' ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.5)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = theme === 'light' ? 'rgba(0, 0, 0, 0.9)' : 'rgba(255, 255, 255, 0.9)';
                e.currentTarget.style.filter = theme === 'light' 
                  ? 'drop-shadow(0 0 6px rgba(0, 0, 0, 0.3))' 
                  : 'drop-shadow(0 0 6px rgba(255, 255, 255, 0.5))';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = theme === 'light' ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.5)';
                e.currentTarget.style.filter = 'none';
              }}
            >
              Made by Deep
            </a>
          </footer>
        </>
      )}
    </>
  );
}

export default App;
