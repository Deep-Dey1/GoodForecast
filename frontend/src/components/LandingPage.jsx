import { useEffect, useState } from 'react';

const LandingPage = ({ onAnimationComplete }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Show landing page for 1.5 seconds then fade out
    const timer = setTimeout(() => {
      setFadeOut(true);
      // Wait for fade out animation to complete
      setTimeout(() => {
        onAnimationComplete();
      }, 500);
    }, 1500);

    return () => clearTimeout(timer);
  }, [onAnimationComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[100] bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] flex items-center justify-center overflow-hidden transition-opacity duration-500 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Main content */}
      <div className="text-center px-8">
        {/* Logo and Title */}
        <div className="flex flex-col items-center gap-6">
          {/* Icon */}
          <div className="text-8xl">🌤️</div>
          
          {/* App Name */}
          <h1 className="text-6xl font-bold text-white tracking-tight">
            Good Forecast
          </h1>
          
          {/* Tagline */}
          <p className="text-lg text-white/60 font-light">
            Weather Intelligence at Your Fingertips
          </p>
          
          {/* Loading Dots */}
          <div className="flex gap-2 mt-4">
            <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
