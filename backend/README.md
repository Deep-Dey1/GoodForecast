# 🔧 Backend API - Good Forecast# Weather App - Backend API



Node.js/Express backend server for the Good Forecast weather application.Backend service for the Weather Forecasting Application built with Node.js and Express.



## 📋 Overview## 🚀 Features



This is the backend API that powers the Good Forecast weather application. It provides endpoints for fetching weather data, forecasts, air quality information, and city search functionality using the OpenWeatherMap API.- Current weather data by city name or coordinates

- 5-day weather forecast

## 🛠️ Tech Stack- City search with autocomplete

- Input validation and error handling

- **Node.js** - Runtime environment- CORS enabled for frontend integration

- **Express 4.18.2** - Web framework- Health check endpoints

- **Axios 1.4.0** - HTTP client for API requests- Unit tests with Jest

- **CORS** - Cross-origin resource sharing

- **dotenv** - Environment variable management## 📋 Prerequisites



## 📁 Project Structure- Node.js (v14 or higher)

- npm or yarn

```- OpenWeatherMap API key (free)

backend/

├── src/## 🛠️ Installation

│   ├── controllers/

│   │   └── weatherController.js    # Request handlers1. Install dependencies:

│   ├── middleware/```bash

│   │   ├── errorHandler.js         # Global error handlingnpm install

│   │   └── validation.js           # Input validation```

│   ├── routes/

│   │   ├── weatherRoutes.js        # Weather endpoints2. Get your free API key:

│   │   └── healthRoutes.js         # Health check   - Visit [OpenWeatherMap](https://openweathermap.org/api)

│   ├── services/   - Sign up for a free account

│   │   └── weatherService.js       # Business logic & API calls   - Generate an API key

│   ├── utils/

│   │   ├── apiError.js             # Custom error class3. Configure environment variables:

│   │   └── logger.js               # Logging utility   - Copy `.env.example` to `.env`

│   └── server.js                   # Entry point   - Add your API key to `.env`:

├── .env                            # Environment variables```

├── package.jsonOPENWEATHER_API_KEY=your_actual_api_key_here

└── README.md                       # This file```

```

## 🏃 Running the Application

## 🚀 Getting Started

### Development mode (with auto-reload):

### Prerequisites```bash

npm run dev

- Node.js (v16 or higher)```

- npm or yarn

- OpenWeatherMap API key ([Get it free](https://openweathermap.org/api))### Production mode:

```bash

### Installationnpm start

```

1. **Install dependencies**

```bashThe server will start on `http://localhost:5000`

cd backend

npm install## 📡 API Endpoints

```

### Health Check

2. **Create environment file**- `GET /api/health` - Service health status

- `GET /api/health/ready` - Readiness check

Create `.env` file:

```env### Weather Endpoints

# Server Configuration- `GET /api/weather/city/:cityName` - Get current weather by city

PORT=5000- `GET /api/weather/coordinates?lat={lat}&lon={lon}` - Get weather by coordinates

NODE_ENV=development- `GET /api/weather/forecast/:cityName` - Get 5-day forecast

- `GET /api/weather/search/:query` - Search cities (autocomplete)

# OpenWeatherMap API

OPENWEATHER_API_KEY=your_api_key_here### Example Requests



# CORS Configuration**Get weather for London:**

ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000```bash

```curl http://localhost:5000/api/weather/city/London

```

### Running the Server

**Get weather by coordinates:**

**Development mode (with auto-reload):**```bash

```bashcurl http://localhost:5000/api/weather/coordinates?lat=51.5074&lon=-0.1278

npm run dev```

```

**Get 5-day forecast:**

**Production mode:**```bash

```bashcurl http://localhost:5000/api/weather/forecast/Paris

npm start```

```

**Search cities:**

Server will run on `http://localhost:5000````bash

curl http://localhost:5000/api/weather/search/New

## 📡 API Endpoints```



### Base URL## 🧪 Testing

```

http://localhost:5000/apiRun tests:

``````bash

npm test

### Endpoints```



| Method | Endpoint | Description |Run tests in watch mode:

|--------|----------|-------------|```bash

| GET | `/api/health` | Health check |npm run test:watch

| GET | `/api/weather/city/:cityName` | Get weather by city |```

| GET | `/api/weather/coordinates?lat=&lon=` | Get weather by coordinates |

| GET | `/api/weather/forecast/:cityName` | Get 5-day forecast |## 📁 Project Structure

| GET | `/api/weather/air-quality?lat=&lon=` | Get air quality data |

| GET | `/api/weather/search/:query` | Search cities (geocoding) |```

backend/

For detailed API documentation with request/response examples, see the main [README](../README.md#-api-documentation).├── src/

│   ├── controllers/       # Request handlers

## 🔒 Input Validation│   ├── middleware/        # Custom middleware

│   ├── routes/           # API routes

All endpoints include input validation:│   ├── services/         # Business logic

│   ├── utils/            # Utility functions

- **City Name:** Letters, spaces, Unicode characters (2-100 chars)│   └── server.js         # App entry point

- **Coordinates:** Latitude (-90 to 90), Longitude (-180 to 180)├── tests/                # Test files

- **Search Query:** Minimum 2 characters├── .env                  # Environment variables

├── .env.example          # Environment template

## ⚠️ Error Handling├── jest.config.js        # Jest configuration

└── package.json

Standardized error responses:```

```json

{## 🐳 Docker Support

  "success": false,

  "message": "Error description",Build Docker image:

  "type": "ErrorType",```bash

  "statusCode": 404docker build -t weather-app-backend .

}```

```

Run container:

## 🔧 Configuration```bash

docker run -p 5000:5000 --env-file .env weather-app-backend

### Environment Variables```



| Variable | Required | Default | Description |## 🔧 Environment Variables

|----------|----------|---------|-------------|

| `PORT` | No | 5000 | Server port || Variable | Description | Default |

| `NODE_ENV` | No | development | Environment ||----------|-------------|---------|

| `OPENWEATHER_API_KEY` | Yes | - | API key || `OPENWEATHER_API_KEY` | OpenWeatherMap API key | Required |

| `ALLOWED_ORIGINS` | No | * | CORS origins || `PORT` | Server port | 5000 |

| `NODE_ENV` | Environment (development/production) | development |

## 📞 Support| `ALLOWED_ORIGINS` | CORS allowed origins | * |



For issues or questions, check the main [README](../README.md) or open an issue on GitHub.## 📝 API Response Format



---### Success Response

```json

Made with ❤️ by Deep{

  "success": true,
  "data": {
    // Response data
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "type": "ErrorType"
}
```

## 🚨 Error Handling

The API handles various error types:
- `ValidationError` (400) - Invalid input
- `ApiError` (4xx/5xx) - External API errors
- City not found (404)
- Invalid API key (401)
- Rate limiting (429)

## 📊 Code Quality

This project is configured for:
- **SonarQube** - Code quality analysis
- **Jest** - Unit testing with coverage
- **ESLint** - Code linting (to be added)

## 🤝 Contributing

1. Follow the existing code structure
2. Write tests for new features
3. Ensure all tests pass before committing
4. Update documentation as needed

## 📄 License

ISC
