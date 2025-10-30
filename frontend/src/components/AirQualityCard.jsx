const AirQualityCard = ({ airQuality, compact = false }) => {
  if (!airQuality) return null;

  const getAQIGif = (level) => {
    const gifs = {
      'Good': 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExN2U4eXlhYmtvYjZuOTlkcWQ3NWx3N29ibjN4OWM5MzhjbGlrOTYwcCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/zNbqGADAp9bSU/giphy.gif',
      'Fair': 'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExY2V4cTQzMWdkbW9mZ3k5Z3dxa2luZGJpMHIxcnVqNm44dTRncWdtNyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/iF8zmKrFWTjpwVD8Hc/giphy.gif',
      'Moderate': 'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMWhwejdydm05M2NkeGU2dm5pdTE0ZGpoZHRnemJ0aHcyNGNhOGplaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/EOqZlK62SlWUJKiFf9/giphy.gif',
      'Poor': 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExNXBwaXlkeXBmdTRmcHFsZDl1M2kxMTh0c25ucjVyM3E5NDJoN2l3bSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/npj0UqxfipRs0nT0OF/giphy.gif',
      'Very Poor': 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExenQxZjM3eXE5ejUzcnpwaGxqb3ZhOXM3YnlqeXVuMjl6MWxobWEzNiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/X7SFRcVxqzKwhSYrWL/giphy.gif'
    };
    return gifs[level] || gifs['Good'];
  };

  const getAQIBadgeColor = (level) => {
    const colors = {
      'Good': 'badge-success',
      'Fair': 'badge-info',
      'Moderate': 'badge-warning',
      'Poor': 'badge-error',
      'Very Poor': 'badge-error'
    };
    return colors[level] || 'badge-success';
  };

  const getPollutantInfo = (name) => {
    const info = {
      'pm2_5': { label: 'PM2.5', cause: 'Fine particles from combustion' },
      'pm10': { label: 'PM10', cause: 'Coarse particles from dust' },
      'o3': { label: 'O₃', cause: 'Ground level ozone' },
      'no2': { label: 'NO₂', cause: 'From vehicle emissions' },
      'so2': { label: 'SO₂', cause: 'From fossil fuels' },
      'co': { label: 'CO', cause: 'Colorless, odorless gas' },
      'no': { label: 'NO', cause: 'From combustion processes' },
      'nh3': { label: 'NH₃', cause: 'From agriculture' }
    };
    return info[name] || { label: name, cause: 'Unknown source' };
  };

  return (
    <div className="card bg-base-100 shadow-xl overflow-hidden border-0 h-full flex flex-col lg:flex-row">
      {/* Left/Top Side - AQI Score with GIF */}
      <figure className="lg:w-1/3 h-32 lg:h-full relative overflow-hidden flex-shrink-0">
        <img
          src={getAQIGif(airQuality.level)}
          alt={airQuality.level}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-r from-transparent to-base-100/30"></div>
      </figure>
      
      {/* Right/Bottom Side - Pollutants Information */}
      <div className="card-body flex-1 p-3 sm:p-4 lg:p-4 xl:p-5 lg:pb-6 overflow-auto">
        <div className="flex items-center justify-between mb-2 lg:mb-3">
          <h2 className="card-title text-sm sm:text-base lg:text-lg">💨 Air Quality</h2>
          <div className={`badge ${getAQIBadgeColor(airQuality.level)} text-[10px] sm:text-xs`}>
            {airQuality.level}
          </div>
        </div>
        
        <div className="mb-2 lg:mb-3">
          <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-1">
            {airQuality.aqi}
          </div>
          <p className="text-xs sm:text-sm opacity-70">{airQuality.description}</p>
        </div>

        {/* Pollutants Grid - Responsive columns */}
        <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
          {Object.entries(airQuality.components).map(([key, value]) => {
            const info = getPollutantInfo(key);
            return (
              <div key={key} className="bg-base-200 rounded-lg p-1.5 sm:p-2">
                <div className="text-[9px] sm:text-[10px] font-semibold opacity-70 truncate">
                  {info.label}
                </div>
                <div className="text-xs sm:text-sm font-bold truncate">{value}</div>
                <div className="text-[7px] sm:text-[8px] opacity-50">μg/m³</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AirQualityCard;
