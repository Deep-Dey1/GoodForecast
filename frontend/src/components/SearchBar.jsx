import { useState } from 'react';

const SearchBar = ({ onSearch, loading }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto mb-8">
      <div className="relative">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="🔍 Enter city name (e.g., London, New York, Tokyo...)"
          className="input-field pr-12 text-lg shadow-lg border-2 border-purple-200 focus:border-purple-500"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !city.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg font-semibold"
        >
          {loading ? (
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          )}
        </button>
      </div>
      
      {/* Quick city buttons */}
      <div className="flex flex-wrap gap-2 mt-4 justify-center items-center">
        <span className="text-gray-600 text-sm font-semibold">⚡ Quick search:</span>
        {['London', 'New York', 'Tokyo', 'Paris', 'Dubai'].map((quickCity) => (
          <button
            key={quickCity}
            type="button"
            onClick={() => {
              setCity(quickCity);
              onSearch(quickCity);
            }}
            disabled={loading}
            className="text-sm bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 text-purple-700 font-medium px-4 py-2 rounded-full border-2 border-purple-200 hover:border-purple-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
          >
            {quickCity}
          </button>
        ))}
      </div>
    </form>
  );
};

export default SearchBar;
