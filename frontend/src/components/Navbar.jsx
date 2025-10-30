import { useState, useEffect, useRef } from 'react';

const Navbar = ({ onSearch, loading, showSearch, currentCity, weather }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const dropdownRef = useRef(null);

  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || '8d04d86f428a3052f7c2f814da0fb63b';

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format time based on timezone offset
  const formatTime = (date, timezoneOffset) => {
    const utc = date.getTime() + (date.getTimezoneOffset() * 60000);
    const cityTime = new Date(utc + (timezoneOffset * 1000));
    return cityTime.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatSunTime = (isoString, timezoneOffset) => {
    if (!isoString) return 'N/A';
    const date = new Date(isoString);
    const utc = date.getTime() + (date.getTimezoneOffset() * 60000);
    const cityTime = new Date(utc + (timezoneOffset * 1000));
    return cityTime.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  // Update search term when currentCity changes
  useEffect(() => {
    if (currentCity) {
      setSearchTerm(currentCity);
      // Hide suggestions and clear them when city is updated from map
      setShowSuggestions(false);
      setSuggestions([]);
      setSelectedIndex(-1);
    }
  }, [currentCity]);

  // Fetch city suggestions
  useEffect(() => {
    const fetchSuggestions = async () => {
      // Only fetch if input is focused and has enough characters
      if (!isInputFocused || searchTerm.trim().length < 2) {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }

      setLoadingSuggestions(true);
      try {
        const response = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${searchTerm}&limit=5&appid=${API_KEY}`
        );
        const data = await response.json();
        setSuggestions(data);
        setShowSuggestions(data.length > 0 && isInputFocused);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestions([]);
      } finally {
        setLoadingSuggestions(false);
      }
    };

    const debounceTimer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchTerm, isInputFocused]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowSuggestions(false);
        setIsInputFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // If a suggestion is selected with keyboard, use that
    if (selectedIndex >= 0 && suggestions[selectedIndex]) {
      handleSuggestionClick(suggestions[selectedIndex]);
    } else if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
      setShowSuggestions(false);
      setSuggestions([]);
      setSelectedIndex(-1);
      setIsInputFocused(false);
      // Blur the input to remove focus
      e.target.querySelector('input')?.blur();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    const cityName = `${suggestion.name}${suggestion.state ? ', ' + suggestion.state : ''}, ${suggestion.country}`;
    setSearchTerm(cityName);
    setShowSuggestions(false);
    setSuggestions([]);
    setSelectedIndex(-1);
    setIsInputFocused(false);
    onSearch(cityName);
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
      case 'Enter':
        if (selectedIndex >= 0) {
          e.preventDefault();
          handleSuggestionClick(suggestions[selectedIndex]);
        }
        break;
      default:
        break;
    }
  };

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-6xl z-50">
      <div className="card px-4 md:px-6 py-3 md:py-4 shadow-2xl relative">
        {/* Desktop: Single row, Mobile: Logo+Search then Time below */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-3 lg:gap-4">
          {/* Logo/Brand Name */}
          <div className="flex items-center gap-1 md:gap-2 min-w-fit flex-shrink-0">
            <div className="text-xl md:text-3xl">🌤️</div>
            <h1 className={`text-sm sm:text-lg md:text-2xl font-bold text-white whitespace-nowrap ${showSearch ? '' : 'opacity-0'}`}>
              Good Forecast
            </h1>
          </div>

          {/* Search Bar */}
          {showSearch && (
            <form onSubmit={handleSubmit} className="w-full lg:flex-1 lg:max-w-2xl" ref={dropdownRef}>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setSelectedIndex(-1);
                }}
                onFocus={() => {
                  setIsInputFocused(true);
                  if (suggestions.length > 0) {
                    setShowSuggestions(true);
                  }
                }}
                onBlur={() => {
                  // Delay to allow click on suggestions
                  setTimeout(() => {
                    setIsInputFocused(false);
                    setShowSuggestions(false);
                  }, 200);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Search for any city..."
                disabled={loading}
                className="w-full px-6 py-3 pr-12 border-2 border-base-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-base-100 text-base-content placeholder:text-base-content/50"
                autoComplete="off"
              />
              <button
                type="submit"
                disabled={loading || !searchTerm.trim()}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 disabled:opacity-30"
              >
                {loading ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
                )}
              </button>

              {/* Dropdown Suggestions */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full mt-2 w-full bg-base-100 border-2 border-base-300 rounded-2xl shadow-2xl overflow-hidden z-50">
                  {loadingSuggestions ? (
                    <div className="px-4 py-3 text-center">
                      <span className="loading loading-spinner loading-sm"></span>
                    </div>
                  ) : (
                    <ul className="max-h-60 overflow-y-auto">
                      {suggestions.map((suggestion, index) => (
                        <li
                          key={`${suggestion.lat}-${suggestion.lon}-${index}`}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className={`px-4 py-3 cursor-pointer border-b border-base-300 last:border-b-0 ${
                            selectedIndex === index ? 'bg-base-200' : ''
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-semibold text-base-content">
                                {suggestion.name}
                                {suggestion.state && `, ${suggestion.state}`}
                              </div>
                              <div className="text-sm text-base-content/70">
                                {suggestion.country}
                              </div>
                            </div>
                            <div className="text-xs text-base-content/50">
                              {suggestion.lat.toFixed(2)}°, {suggestion.lon.toFixed(2)}°
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
            </form>
          )}

          {/* Time Information - Below on mobile, same row on desktop */}
          {weather && showSearch && (
            <div className="flex items-center gap-2 md:gap-4 min-w-fit flex-wrap justify-center lg:justify-end w-full lg:w-auto">
            {/* Current Time */}
            <div className="flex flex-col items-center md:items-end">
              <div className="text-[10px] md:text-xs text-base-content/70">Local Time</div>
              <div className="text-xs md:text-sm font-semibold text-white">
                {formatTime(currentTime, weather.timezone)}
              </div>
            </div>

            {/* Sunrise */}
            <div className="flex items-center gap-1">
              <div className="text-xl md:text-2xl">🌅</div>
              <div className="flex flex-col">
                <div className="text-[10px] md:text-xs text-base-content/70">Sunrise</div>
                <div className="text-xs md:text-sm font-semibold text-white">
                  {formatSunTime(weather.sunrise, weather.timezone)}
                </div>
              </div>
            </div>

            {/* Sunset */}
            <div className="flex items-center gap-1">
              <div className="text-xl md:text-2xl">🌇</div>
              <div className="flex flex-col">
                <div className="text-[10px] md:text-xs text-base-content/70">Sunset</div>
                <div className="text-xs md:text-sm font-semibold text-white">
                  {formatSunTime(weather.sunset, weather.timezone)}
                </div>
              </div>
            </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
