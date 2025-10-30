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
    <div className="card card-side bg-base-100 shadow-xl overflow-hidden border-0 h-[350px]">
      {/* Left Side - AQI Score with GIF */}
      <figure className="w-1/3 relative overflow-hidden h-full">
        <img
          src={getAQIGif(airQuality.level)}
          alt={airQuality.level}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-base-100/30"></div>
      </figure>
      
      {/* Right Side - Pollutants Information */}
      <div className="card-body w-2/3 p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="card-title text-lg">💨 Air Quality Index</h2>
          <div className={`badge badge-lg ${getAQIBadgeColor(airQuality.level)}`}>
            {airQuality.level}
          </div>
        </div>
        
        <div className="mb-3">
          <div className="text-4xl font-bold text-primary mb-1">{airQuality.aqi}</div>
          <p className="text-sm opacity-70">{airQuality.description}</p>
        </div>

        {/* Pollutants Grid */}
        <div className="grid grid-cols-4 gap-2">
          {Object.entries(airQuality.components).map(([key, value]) => {
            const info = getPollutantInfo(key);
            return (
              <div key={key}>
                <div className="bg-base-200 rounded-lg p-2">
                  <div className="text-[10px] font-semibold opacity-70">{info.label}</div>
                  <div className="text-sm font-bold">{value}</div>
                  <div className="text-[8px] opacity-50">μg/m³</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AirQualityCard;
