const ErrorMessage = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="max-w-2xl mx-auto mb-6 animate-fade-in">
      <div className="bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-red-500 p-5 rounded-xl shadow-lg backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-red-100 rounded-full p-2 mr-3">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-red-800">Oops! Something went wrong</p>
              <p className="text-red-700 text-sm mt-1">{message}</p>
            </div>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="ml-4 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-full p-2 transition-all duration-200"
              aria-label="Close error message"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
