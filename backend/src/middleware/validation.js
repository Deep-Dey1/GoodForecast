const { ValidationError } = require('../utils/errors');

// Validate city name parameter
const validateCityName = (req, res, next) => {
  const { cityName } = req.params;

  if (!cityName || cityName.trim().length === 0) {
    return next(new ValidationError('City name is required'));
  }

  if (cityName.length < 2) {
    return next(new ValidationError('City name must be at least 2 characters'));
  }

  if (cityName.length > 100) {
    return next(new ValidationError('City name is too long'));
  }

  // Allow Unicode letters, spaces, hyphens, apostrophes, commas, periods, and parentheses
  // \p{L} matches any Unicode letter, \p{M} matches combining marks (accents)
  const cityNameRegex = /^[\p{L}\p{M}\s\-',.()]+$/u;
  if (!cityNameRegex.test(cityName)) {
    return next(new ValidationError('City name contains invalid characters'));
  }

  next();
};

// Validate coordinates
const validateCoordinates = (req, res, next) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return next(new ValidationError('Latitude and longitude are required'));
  }

  const latitude = parseFloat(lat);
  const longitude = parseFloat(lon);

  if (isNaN(latitude) || isNaN(longitude)) {
    return next(new ValidationError('Invalid coordinates format'));
  }

  if (latitude < -90 || latitude > 90) {
    return next(new ValidationError('Latitude must be between -90 and 90'));
  }

  if (longitude < -180 || longitude > 180) {
    return next(new ValidationError('Longitude must be between -180 and 180'));
  }

  next();
};

module.exports = {
  validateCityName,
  validateCoordinates
};
