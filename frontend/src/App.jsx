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
            background: '#1f2937',
            color: '#fff',
            padding: '16px',
            borderRadius: '10px',
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
          background: '#1f2937',
          color: '#fff',
          padding: '16px',
          borderRadius: '10px',
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

  // Fetch initial weather when landing page completes
  useEffect(() => {
    if (!showLanding && !initialLoadComplete) {
      fetchInitialWeather();
    }
  }, [showLanding]);

  return (
    <>
      <Toaster />
      <WaveBackground />
      
      {/* Landing Page Animation */}
      {showLanding && (
        <LandingPage onAnimationComplete={() => setShowLanding(false)} />
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
          />

          {/* Main Content - Desktop: Fixed, Mobile: Scrollable */}
          <div className="lg:fixed lg:inset-0 lg:pt-24 lg:pb-2 lg:overflow-hidden pt-32 sm:pt-28 md:pt-24 pb-4">
            <div className="h-full flex flex-col gap-4 max-w-[95%] mx-auto overflow-auto lg:overflow-hidden">
              
              {/* Error Message */}
              {error && (
                <div className="flex-shrink-0">
                  <ErrorMessage message={error} onClose={() => setError(null)} />
                </div>
              )}

              {/* Main Layout: Mobile - Column (Map, Forecast, AQI), Desktop - Grid (Map Left, Weather/AQI Right) */}
              <div className="flex-1 min-h-0 flex flex-col lg:grid lg:grid-cols-2 gap-4">
                
                {/* Map - First on Mobile, Left Side on Desktop */}
                <div className="lg:order-1 order-1 h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-full min-h-0 flex flex-col">
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

                {/* Forecast & AQI - Second/Third on Mobile, Right Side on Desktop */}
                <div className="lg:order-2 order-2 h-auto lg:h-full flex flex-col gap-4 lg:gap-2 lg:mt-[50px] mt-0">
                  {/* Weather Forecast */}
                  <div className="lg:flex-[2] min-h-0 lg:overflow-auto">
                    {forecast ? (
                      <ForecastCard forecast={forecast} compact={true} />
                    ) : (
                      <div className="card h-full min-h-[250px] flex items-center justify-center bg-base-100">
                        <div className="text-center p-8">
                          <span className="loading loading-spinner loading-lg"></span>
                          <h3 className="text-lg font-bold text-base-content/70 mt-4">
                            Loading forecast...
                          </h3>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* AQI */}
                  <div className="lg:flex-[1] min-h-0 lg:overflow-auto lg:-mt-[520px] mt-0">
                    {airQuality ? (
                      <AirQualityCard airQuality={airQuality} compact={true} />
                    ) : (
                      <div className="card h-full min-h-[250px] flex items-center justify-center bg-base-100">
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
              className="text-sm text-white/40 hover:text-white/60 transition-colors blur-[0.5px] hover:blur-0"
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
