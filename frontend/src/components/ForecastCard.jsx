const ForecastCard = ({ forecast, compact = false }) => {
  if (!forecast || !forecast.dailyForecasts) return null;

  const { city, country, dailyForecasts } = forecast;

  const getDayName = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  // Get weather GIF based on condition
  const getWeatherGif = (description) => {
    const desc = description.toLowerCase();
    
    if (desc.includes('clear') || desc.includes('sunny')) {
      return 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExdzNhemlnM2xma2lzbms3ZjVxNnR0ZnF6dHNod3FmYnp1d3lsMzFpOSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/hcXywlfUOeKSgPETlT/giphy.gif';
    } else if (desc.includes('heavy rain') || desc.includes('heavy') || desc.includes('extreme')) {
      return 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExdnNnenl6Y2xpZjRnb3djcDBmMXY0OHowM3lvY2N0cmZoeTczdjBoMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/NTfYDSrxUTxMF8uOwJ/giphy.gif';
    } else if (desc.includes('rain') || desc.includes('drizzle')) {
      return 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMWdjM253aDFta2F2NnNyMXpxZWhncmdqdWo0NWhndjRwZGs1MmxobiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xTcnT45z6H5gxFYZZS/giphy.gif';
    } else if (desc.includes('thunder') || desc.includes('storm')) {
      return 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZmYwMXRreTlreWQ1ODR4ZDhpdDllaW9zcHk3Mnh5aWNwYjV0Z2JucCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0MYOJCCE8yTfcwSY/giphy.gif';
    } else if (desc.includes('snow')) {
      return 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExYmU2enVjb2FmM2J5bGM4aGduN2x0cXByemNlamhkd2lydW5nb3Z2aSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3bxlxrmbNSWgU/giphy.gif';
    } else if (desc.includes('mist') || desc.includes('fog') || desc.includes('haze')) {
      return 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExejZ4NnR6dDFpdXp0eDc4Nmg5d2RoMnBqZTlobnR0MWR0bDQ2ZWl1ciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0MYRbawhDAnyMG4w/giphy.gif';
    } else if (desc.includes('cloud')) {
      return 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExcXA5aGgxMTcxNG5hYWJjY3didmhubnhqYTZ1ZHVwZTlmdThjc2RjdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l378bSNpMzDW73mSY/giphy.gif';
    } else {
      return 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExcXA5aGgxMTcxNG5hYWJjY3didmhubnhqYTZ1ZHVwZTlmdThjc2RjdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l378bSNpMzDW73mSY/giphy.gif';
    }
  };

  // Get one forecast per day (middle of the day)
  const allDays = dailyForecasts.map((day) => {
    const middayForecast = day.forecasts[Math.floor(day.forecasts.length / 2)] || day.forecasts[0];
    return {
      date: day.date,
      ...middayForecast,
    };
  });

  // Show 4 days on mobile (2x2), 5 on desktop (1x5)
  const dailySummary = window.innerWidth < 1024 ? allDays.slice(0, 4) : allDays.slice(0, 5);

  return (
    <div className={compact ? "card bg-base-100 h-full flex flex-col p-3 sm:p-4 lg:p-5 lg:pt-6 overflow-hidden border-0" : "max-w-4xl mx-auto mt-8 animate-slide-up"}>
      <h3 className={compact ? "text-base sm:text-lg lg:text-xl font-bold text-base-content mb-2 lg:mb-3 flex-shrink-0" : "text-2xl font-bold text-base-content mb-6"}>
        🌤️ {compact ? 'Forecast' : `Forecast for ${city}, ${country}`}
      </h3>
      
      <div className={compact ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3 lg:gap-3 flex-1 min-h-0" : "grid grid-cols-1 md:grid-cols-5 gap-4"}>
        {dailySummary.map((day, index) => (
          <div key={index} className="card bg-base-100 shadow-xl overflow-hidden rounded-xl lg:rounded-2xl flex flex-col p-0 min-h-0">
            <figure className="w-full aspect-[4/3] m-0 p-0 overflow-hidden flex-shrink-0 rounded-t-xl lg:rounded-t-2xl">
              <img
                src={getWeatherGif(day.weather.description)}
                alt={day.weather.description}
                className="w-full h-full object-cover"
              />
            </figure>
            <div className="card-body p-1.5 sm:p-2 lg:p-3 flex-1 flex flex-col justify-between min-h-0">
              <h2 className={compact ? "card-title text-xs sm:text-sm lg:text-base justify-center" : "card-title text-base justify-center"}>
                {index === 0 ? 'Today' : getDayName(day.date).split(',')[0]}
              </h2>
              <div className="text-center">
                <div className={compact ? "text-base sm:text-lg lg:text-xl xl:text-2xl font-bold text-primary" : "text-3xl font-bold text-primary"}>
                  {day.temperature.temp}°C
                </div>
                <p className={compact ? "text-[9px] sm:text-[10px] lg:text-xs capitalize mt-1 whitespace-nowrap overflow-hidden text-ellipsis px-1" : "text-sm capitalize mt-2"}>
                  {day.weather.description}
                </p>
                <div className={compact ? "flex justify-around text-[10px] sm:text-xs lg:text-sm mt-1 sm:mt-2" : "flex justify-around text-sm mt-3"}>
                  <span className="text-error">↑ {day.temperature.max}°</span>
                  <span className="text-info">↓ {day.temperature.min}°</span>
                </div>
                {!compact && (
                  <div className="mt-2 text-xs opacity-70">
                    💧 {day.pop}% chance of rain
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastCard;
