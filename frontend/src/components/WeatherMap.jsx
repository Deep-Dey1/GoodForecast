import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const WeatherMap = ({ weather, onLocationClick }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);
  const tileLayerRef = useRef(null);
  const clickMarkerRef = useRef(null);
  const onLocationClickRef = useRef(onLocationClick);

  // Keep callback reference up to date
  useEffect(() => {
    onLocationClickRef.current = onLocationClick;
  }, [onLocationClick]);

  // Initialize map only once
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Create map
    mapInstanceRef.current = L.map(mapRef.current).setView([0, 0], 2);

    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(mapInstanceRef.current);

    // Add weather overlay from OpenWeatherMap
    tileLayerRef.current = L.tileLayer(
      `https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${import.meta.env.VITE_OPENWEATHER_API_KEY || '8d04d86f428a3052f7c2f814da0fb63b'}`,
      {
        maxZoom: 19,
        opacity: 0.5,
        attribution: 'Weather from OpenWeatherMap'
      }
    ).addTo(mapInstanceRef.current);

    // Add click event listener to map
    mapInstanceRef.current.on('click', (e) => {
      const { lat, lng } = e.latlng;
      console.log('Map clicked at:', lat, lng);
      
      // Add a temporary marker at clicked location
      if (clickMarkerRef.current) {
        mapInstanceRef.current.removeLayer(clickMarkerRef.current);
      }
      
      // Create a pulsing marker for the clicked location
      const clickIcon = L.divIcon({
        html: `
          <div style="
            background: #3b82f6;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            border: 3px solid white;
            box-shadow: 0 0 0 8px rgba(59, 130, 246, 0.3);
            animation: pulse 1.5s ease-in-out infinite;
          "></div>
        `,
        className: 'click-marker',
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      });
      
      clickMarkerRef.current = L.marker([lat, lng], { icon: clickIcon })
        .addTo(mapInstanceRef.current)
        .bindPopup('🔄 Loading weather data...')
        .openPopup();
      
      // Call the callback to fetch weather for this location
      if (onLocationClickRef.current) {
        console.log('Calling onLocationClick with:', lat, lng);
        onLocationClickRef.current(lat, lng);
      }
    });

    // Cleanup on unmount
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update map view and marker when weather changes
  useEffect(() => {
    if (!weather || !mapInstanceRef.current) return;

    const { lat, lon } = weather.coordinates;

    // Update map view
    mapInstanceRef.current.setView([lat, lon], 10);

    // Remove old weather marker if exists
    if (markerRef.current) {
      mapInstanceRef.current.removeLayer(markerRef.current);
    }

    // Remove click marker if exists (we got new weather)
    if (clickMarkerRef.current) {
      mapInstanceRef.current.removeLayer(clickMarkerRef.current);
      clickMarkerRef.current = null;
    }

    // Create custom icon with weather emoji
    const weatherIcon = L.divIcon({
      html: `
        <div style="
          background: white;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          border: 3px solid #3b82f6;
        ">
          ${getWeatherEmoji(weather.weather.main)}
        </div>
      `,
      className: 'custom-weather-icon',
      iconSize: [50, 50],
      iconAnchor: [25, 25],
    });

    // Add new marker with popup
    markerRef.current = L.marker([lat, lon], { icon: weatherIcon })
      .addTo(mapInstanceRef.current)
      .bindPopup(`
        <div style="text-align: center; min-width: 150px;">
          <h3 style="margin: 0 0 8px 0; font-weight: bold;">${weather.city}, ${weather.country}</h3>
          <p style="margin: 4px 0; font-size: 24px;">${weather.temperature.current}°C</p>
          <p style="margin: 4px 0; text-transform: capitalize;">${weather.weather.description}</p>
          <p style="margin: 4px 0; color: #666; font-size: 12px;">
            💧 ${weather.humidity}% | 💨 ${weather.wind.speed} m/s
          </p>
        </div>
      `)
      .openPopup();
  }, [weather]);

  const getWeatherEmoji = (condition) => {
    const emojiMap = {
      'Clear': '☀️',
      'Clouds': '☁️',
      'Rain': '🌧️',
      'Drizzle': '🌦️',
      'Thunderstorm': '⛈️',
      'Snow': '❄️',
      'Mist': '🌫️',
      'Smoke': '🌫️',
      'Haze': '🌫️',
      'Dust': '🌫️',
      'Fog': '🌫️',
      'Sand': '🌫️',
      'Ash': '🌫️',
      'Squall': '💨',
      'Tornado': '🌪️'
    };
    return emojiMap[condition] || '🌍';
  };

  if (!weather) return null;

  return (
    <div className="card bg-base-100 h-full flex flex-col overflow-hidden border-0 py-4">
      <div 
        ref={mapRef} 
        className="w-full h-full rounded-xl overflow-hidden"
        style={{ zIndex: 0, minHeight: 0 }}
      />
    </div>
  );
};

export default WeatherMap;
