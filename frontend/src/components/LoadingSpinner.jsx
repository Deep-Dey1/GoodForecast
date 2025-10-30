const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        {/* Outer spinning gradient ring */}
        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-spin"></div>
        <div className="absolute top-1 left-1 w-[72px] h-[72px] bg-white rounded-full"></div>
        
        {/* Inner spinning gradient ring */}
        <div className="absolute top-2 left-2 w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1s' }}></div>
        <div className="absolute top-3 left-3 w-14 h-14 bg-white rounded-full"></div>
        
        {/* Floating weather icon in center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-float">
          <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
          </svg>
        </div>
      </div>
      <p className="mt-6 text-base-content text-lg font-medium">Loading weather data...</p>
      <p className="mt-2 text-base-content/60 text-sm animate-pulse">Please wait a moment</p>
    </div>
  );
};

export default LoadingSpinner;
