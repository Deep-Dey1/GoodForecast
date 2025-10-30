import { useState, useEffect, useRef } from 'react';

const Navbar = ({ onSearch, loading, showSearch, currentCity, weather, theme, onToggleTheme }) => {
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

    const debounceTimer = setTimeout(fetchSuggestions, 150); // Faster response
    return () => clearTimeout(debounceTimer);
  }, [searchTerm, isInputFocused]);

  // Close dropdown when clicking outside (disabled for mobile to prevent premature closing)
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Only handle actual clicks, not hover or touch proximity
      if (event.type === 'mousedown' || event.type === 'click') {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setShowSuggestions(false);
          setIsInputFocused(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('click', handleClickOutside);
    };
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
    <nav className="absolute lg:fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50">
      <div className="card bg-base-100 rounded-2xl px-3 md:px-6 lg:px-8 py-2 md:py-5 border-0">
        
        {/* MOBILE LAYOUT: Single row for theme toggle, title, and search */}
        <div className="lg:hidden">
          {showSearch && (
            <div className="flex flex-col gap-2">
              {/* Top Row: Theme Toggle + Title + Search Bar */}
              <div className="flex items-center gap-2">
                {/* Theme Toggle Button */}
                <button
                  onClick={onToggleTheme}
                  className="btn btn-xs btn-ghost swap swap-rotate hover:scale-110 transition-all flex-shrink-0"
                  aria-label="Toggle theme"
                  style={{
                    filter: theme === 'light' 
                      ? 'drop-shadow(0 0 6px rgba(255, 200, 0, 0.5)) drop-shadow(0 0 10px rgba(255, 200, 0, 0.3))' 
                      : 'drop-shadow(0 0 6px rgba(100, 149, 237, 0.5)) drop-shadow(0 0 10px rgba(100, 149, 237, 0.3))'
                  }}
                >
                  {theme === 'light' ? (
                    <span className="text-lg">☀️</span>
                  ) : (
                    <span className="text-lg">🌙</span>
                  )}
                </button>
                
                {/* Logo/Brand Name */}
                <h1 className="text-xs font-bold text-base-content whitespace-nowrap flex-shrink-0">
                  Good Forecast
                </h1>
                
                {/* Search Bar */}
                <form onSubmit={handleSubmit} className="flex-1 min-w-0" ref={dropdownRef}>
                  <div className="relative">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setSelectedIndex(-1);
                        setIsInputFocused(true); // Ensure focused when typing
                      }}
                      onFocus={() => {
                        setIsInputFocused(true);
                        setShowSuggestions(suggestions.length > 0);
                      }}
                      onClick={() => {
                        setIsInputFocused(true);
                        setShowSuggestions(suggestions.length > 0);
                      }}
                      onKeyDown={handleKeyDown}
                      placeholder="Search city..."
                      disabled={loading}
                      className="w-full px-3 py-1.5 pr-8 border border-base-300 rounded-full focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent transition-all bg-base-100 text-base-content placeholder:text-base-content/50 text-xs"
                      autoComplete="off"
                    />
                    <button
                      type="submit"
                      disabled={loading || !searchTerm.trim()}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 disabled:opacity-30"
                    >
                      {loading ? (
                        <span className="loading loading-spinner loading-xs"></span>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                      )}
                    </button>

                    {/* Dropdown Suggestions - Mobile */}
                    {showSuggestions && suggestions.length > 0 && (
                      <div 
                        className="absolute top-full mt-1 w-full bg-base-100 border-2 border-primary rounded-xl shadow-2xl overflow-hidden z-[100]"
                        onTouchStart={(e) => {
                          e.stopPropagation();
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        {loadingSuggestions ? (
                          <div className="px-3 py-2 text-center">
                            <span className="loading loading-spinner loading-xs"></span>
                          </div>
                        ) : (
                          <ul className="max-h-48 overflow-y-auto">
                            {suggestions.map((suggestion, index) => {
                              const cityName = `${suggestion.name}${suggestion.state ? ', ' + suggestion.state : ''}, ${suggestion.country}`;
                              
                              const handleCityClick = () => {
                                console.log('Mobile: City clicked:', cityName);
                                // Update search term
                                setSearchTerm(cityName);
                                // Close dropdown
                                setShowSuggestions(false);
                                setSuggestions([]);
                                setSelectedIndex(-1);
                                setIsInputFocused(false);
                                // Execute search
                                console.log('Mobile: Executing search for:', cityName);
                                onSearch(cityName);
                              };
                              
                              return (
                                <li
                                  key={`${suggestion.lat}-${suggestion.lon}-${index}`}
                                  onTouchStart={(e) => {
                                    console.log('Mobile: Touch started on:', cityName);
                                    // Immediate visual feedback on touch
                                    e.currentTarget.style.backgroundColor = theme === 'light' ? '#3b82f6' : '#60a5fa';
                                    e.currentTarget.style.color = '#ffffff';
                                    e.currentTarget.style.transform = 'scale(0.98)';
                                  }}
                                  onTouchEnd={(e) => {
                                    console.log('Mobile: Touch ended on:', cityName);
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleCityClick();
                                  }}
                                  onClick={(e) => {
                                    console.log('Mobile: Click event on:', cityName);
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleCityClick();
                                  }}
                                  onTouchCancel={(e) => {
                                    console.log('Mobile: Touch cancelled on:', cityName);
                                    // Reset if touch is cancelled
                                    e.currentTarget.style.backgroundColor = '';
                                    e.currentTarget.style.color = '';
                                    e.currentTarget.style.transform = '';
                                  }}
                                  className={`px-3 py-2.5 cursor-pointer border-b border-base-300 last:border-b-0 transition-all duration-100 active:bg-primary active:text-white ${
                                    selectedIndex === index ? 'bg-primary/20' : ''
                                  }`}
                                  style={{ 
                                    touchAction: 'manipulation',
                                    WebkitTapHighlightColor: 'transparent',
                                    userSelect: 'none'
                                  }}
                                >
                                <div className="flex items-center justify-between">
                                  <div>
                                    <div className="font-semibold text-base-content text-xs">
                                      {suggestion.name}
                                      {suggestion.state && `, ${suggestion.state}`}
                                    </div>
                                    <div className="text-[10px] text-base-content/70">
                                      {suggestion.country}
                                    </div>
                                  </div>
                                  <div className="text-[9px] text-base-content/50">
                                    {suggestion.lat.toFixed(2)}°, {suggestion.lon.toFixed(2)}°
                                  </div>
                                </div>
                              </li>
                              );
                            })}
                          </ul>
                        )}
                      </div>
                    )}
                  </div>
                </form>
              </div>

              {/* Bottom Row: Time Information */}
              {weather && (
                <div className="flex items-center justify-around gap-2 text-[9px] border-t border-base-300 pt-2">
                  {/* Current Time */}
                  <div className="flex flex-col items-center">
                    <div className="text-base-content/60">Local</div>
                    <div className="font-semibold text-base-content">
                      {formatTime(currentTime, weather.timezone)}
                    </div>
                  </div>

                  {/* Sunrise */}
                  <div className="flex items-center gap-1">
                    <div className="text-sm">🌅</div>
                    <div className="flex flex-col">
                      <div className="text-base-content/60">Sunrise</div>
                      <div className="font-semibold text-base-content">
                        {formatSunTime(weather.sunrise, weather.timezone)}
                      </div>
                    </div>
                  </div>

                  {/* Sunset */}
                  <div className="flex items-center gap-1">
                    <div className="text-sm">🌇</div>
                    <div className="flex flex-col">
                      <div className="text-base-content/60">Sunset</div>
                      <div className="font-semibold text-base-content">
                        {formatSunTime(weather.sunset, weather.timezone)}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* DESKTOP LAYOUT: Keep original layout */}
        <div className="hidden lg:flex flex-row items-center justify-between gap-4">
          
          {/* Left Section: Theme Toggle + Logo */}
          <div className="flex items-center gap-4 flex-shrink-0">
            {/* Theme Toggle Button with Emoji and Glow */}
            <button
              onClick={onToggleTheme}
              className="btn btn-md btn-ghost swap swap-rotate hover:scale-110 transition-all"
              aria-label="Toggle theme"
              style={{
                filter: theme === 'light' 
                  ? 'drop-shadow(0 0 8px rgba(255, 200, 0, 0.6)) drop-shadow(0 0 15px rgba(255, 200, 0, 0.4))' 
                  : 'drop-shadow(0 0 8px rgba(100, 149, 237, 0.6)) drop-shadow(0 0 15px rgba(100, 149, 237, 0.4))'
              }}
            >
              {theme === 'light' ? (
                <span className="text-3xl">☀️</span>
              ) : (
                <span className="text-3xl">🌙</span>
              )}
            </button>
            
            {/* Logo/Brand Name */}
            <h1 className={`text-2xl font-bold text-base-content whitespace-nowrap ${showSearch ? '' : 'opacity-0'}`}>
              Good Forecast
            </h1>
          </div>

          {/* Search Bar - Center, flexible width on desktop */}
          {showSearch && (
            <form onSubmit={handleSubmit} className="flex-1 max-w-3xl xl:max-w-4xl" ref={dropdownRef}>
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
                            onMouseDown={(e) => {
                              e.preventDefault();
                              handleSuggestionClick(suggestion);
                            }}
                            onTouchStart={(e) => {
                              e.preventDefault();
                              handleSuggestionClick(suggestion);
                            }}
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

          {/* Time Information - Right side on desktop */}
          {weather && showSearch && (
            <div className="flex items-center gap-4 flex-shrink-0">
              {/* Current Time */}
              <div className="flex flex-col items-end">
                <div className="text-xs text-base-content/70">Local Time</div>
                <div className="text-sm font-semibold text-base-content">
                  {formatTime(currentTime, weather.timezone)}
                </div>
              </div>

              {/* Sunrise */}
              <div className="flex items-center gap-1">
                <div className="text-xl">🌅</div>
                <div className="flex flex-col">
                  <div className="text-xs text-base-content/70">Sunrise</div>
                  <div className="text-sm font-semibold text-base-content">
                    {formatSunTime(weather.sunrise, weather.timezone)}
                  </div>
                </div>
              </div>

              {/* Sunset */}
              <div className="flex items-center gap-1">
                <div className="text-xl">🌇</div>
                <div className="flex flex-col">
                  <div className="text-xs text-base-content/70">Sunset</div>
                  <div className="text-sm font-semibold text-base-content">
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
