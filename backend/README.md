# 🔧 Weather App Backend API# 🔧 Backend API - Good Forecast# Weather App - Backend API



A robust Node.js/Express REST API providing weather data services with comprehensive testing and Docker support.



## 📋 OverviewNode.js/Express backend server for the Good Forecast weather application.Backend service for the Weather Forecasting Application built with Node.js and Express.



This backend service acts as a middleware between the frontend application and the OpenWeatherMap API, providing structured weather data, forecasts, and air quality information.



## 🏗️ Architecture## 📋 Overview## 🚀 Features



```

Frontend Request

      ↓This is the backend API that powers the Good Forecast weather application. It provides endpoints for fetching weather data, forecasts, air quality information, and city search functionality using the OpenWeatherMap API.- Current weather data by city name or coordinates

Express Router (routes/)

      ↓- 5-day weather forecast

Controller (controllers/)

      ↓## 🛠️ Tech Stack- City search with autocomplete

Service Layer (services/)

      ↓- Input validation and error handling

OpenWeatherMap API

      ↓- **Node.js** - Runtime environment- CORS enabled for frontend integration

Response Handler (utils/)

      ↓- **Express 4.18.2** - Web framework- Health check endpoints

JSON Response to Frontend

```- **Axios 1.4.0** - HTTP client for API requests- Unit tests with Jest



## 🚀 Tech Stack- **CORS** - Cross-origin resource sharing



- **Runtime:** Node.js 18.20.8- **dotenv** - Environment variable management## 📋 Prerequisites

- **Framework:** Express.js 4.18.2

- **HTTP Client:** Axios 1.4.0

- **Testing:** Jest 29.5.0 + Supertest 6.3.3

- **Development:** Nodemon 3.1.10## 📁 Project Structure- Node.js (v14 or higher)

- **Environment:** dotenv 16.0.3

- **Security:** CORS 2.8.5- npm or yarn



## 📁 Project Structure```- OpenWeatherMap API key (free)



```backend/

backend/

├── src/├── src/## 🛠️ Installation

│   ├── controllers/          # Request handlers

│   │   ├── weatherController.js   # Main weather endpoints│   ├── controllers/

│   │   └── ...

│   ├── services/             # Business logic│   │   └── weatherController.js    # Request handlers1. Install dependencies:

│   │   ├── weatherService.js      # OpenWeatherMap integration

│   │   └── ...│   ├── middleware/```bash

│   ├── routes/               # API routes

│   │   ├── weatherRoutes.js       # Weather endpoints│   │   ├── errorHandler.js         # Global error handlingnpm install

│   │   └── ...

│   ├── middleware/           # Custom middleware│   │   └── validation.js           # Input validation```

│   │   ├── errorHandler.js        # Global error handling

│   │   ├── validateCity.js        # Input validation│   ├── routes/

│   │   └── ...

│   ├── utils/                # Helper functions│   │   ├── weatherRoutes.js        # Weather endpoints2. Get your free API key:

│   │   ├── apiResponse.js         # Standardized responses

│   │   ├── logger.js              # Logging utility│   │   └── healthRoutes.js         # Health check   - Visit [OpenWeatherMap](https://openweathermap.org/api)

│   │   └── ...

│   └── server.js             # Application entry point│   ├── services/   - Sign up for a free account

├── tests/                    # Test files

│   ├── weather.test.js       # API endpoint tests│   │   └── weatherService.js       # Business logic & API calls   - Generate an API key

│   └── ...

├── .env                      # Environment variables (not in git)│   ├── utils/

├── .env.example              # Environment template

├── .dockerignore             # Docker ignore rules│   │   ├── apiError.js             # Custom error class3. Configure environment variables:

├── Dockerfile                # Container definition

├── jest.config.js            # Jest configuration│   │   └── logger.js               # Logging utility   - Copy `.env.example` to `.env`

├── package.json              # Dependencies

└── README.md                 # This file│   └── server.js                   # Entry point   - Add your API key to `.env`:

```

├── .env                            # Environment variables```

## 🔧 Installation & Setup

├── package.jsonOPENWEATHER_API_KEY=your_actual_api_key_here

### Prerequisites

└── README.md                       # This file```

- Node.js 18.x or higher

- npm or yarn```

- OpenWeatherMap API Key ([Get free key](https://openweathermap.org/api))

## 🏃 Running the Application

### Local Setup

## 🚀 Getting Started

1. **Navigate to backend directory:**

   ```bash### Development mode (with auto-reload):

   cd backend

   ```### Prerequisites```bash



2. **Install dependencies:**npm run dev

   ```bash

   npm install- Node.js (v16 or higher)```

   ```

- npm or yarn

3. **Configure environment:**

   ```bash- OpenWeatherMap API key ([Get it free](https://openweathermap.org/api))### Production mode:

   cp .env.example .env

   ``````bash



   Edit `.env` file:### Installationnpm start

   ```env

   OPENWEATHER_API_KEY=your_api_key_here```

   PORT=5000

   NODE_ENV=development1. **Install dependencies**

   ```

```bashThe server will start on `http://localhost:5000`

4. **Start development server:**

   ```bashcd backend

   npm run dev

   ```npm install## 📡 API Endpoints

   Server runs on `http://localhost:5000`

```

5. **Start production server:**

   ```bash### Health Check

   npm start

   ```2. **Create environment file**- `GET /api/health` - Service health status



## 📡 API Endpoints- `GET /api/health/ready` - Readiness check



### Base URLCreate `.env` file:

```

http://localhost:5000/api```env### Weather Endpoints

```

# Server Configuration- `GET /api/weather/city/:cityName` - Get current weather by city

### Available Endpoints

PORT=5000- `GET /api/weather/coordinates?lat={lat}&lon={lon}` - Get weather by coordinates

#### 1. Health Check

```httpNODE_ENV=development- `GET /api/weather/forecast/:cityName` - Get 5-day forecast

GET /api/health

```- `GET /api/weather/search/:query` - Search cities (autocomplete)



**Response:**# OpenWeatherMap API

```json

{OPENWEATHER_API_KEY=your_api_key_here### Example Requests

  "success": true,

  "message": "Weather API is running",

  "timestamp": "2025-11-01T10:30:00.000Z"

}# CORS Configuration**Get weather for London:**

```

ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000```bash

#### 2. Get Weather by City

```http```curl http://localhost:5000/api/weather/city/London

GET /api/weather/city/:cityName

``````



**Parameters:**### Running the Server

- `cityName` (string, required) - Name of the city

**Get weather by coordinates:**

**Example:**

```bash**Development mode (with auto-reload):**```bash

curl http://localhost:5000/api/weather/city/London

``````bashcurl http://localhost:5000/api/weather/coordinates?lat=51.5074&lon=-0.1278



**Response:**npm run dev```

```json

{```

  "success": true,

  "data": {**Get 5-day forecast:**

    "city": "London",

    "country": "GB",**Production mode:**```bash

    "coordinates": {

      "lat": 51.5074,```bashcurl http://localhost:5000/api/weather/forecast/Paris

      "lon": -0.1278

    },npm start```

    "temperature": {

      "current": 15,```

      "feelsLike": 13,

      "min": 12,**Search cities:**

      "max": 18

    },Server will run on `http://localhost:5000````bash

    "weather": {

      "main": "Clouds",curl http://localhost:5000/api/weather/search/New

      "description": "scattered clouds",

      "icon": "03d"## 📡 API Endpoints```

    },

    "wind": {

      "speed": 5.5,

      "direction": 220### Base URL## 🧪 Testing

    },

    "humidity": 75,```

    "pressure": 1013,

    "visibility": 10000,http://localhost:5000/apiRun tests:

    "sunrise": 1698738000,

    "sunset": 1698776000,``````bash

    "timezone": 0

  }npm test

}

```### Endpoints```



#### 3. Get Weather by Coordinates

```http

GET /api/weather/coordinates?lat={latitude}&lon={longitude}| Method | Endpoint | Description |Run tests in watch mode:

```

|--------|----------|-------------|```bash

**Query Parameters:**

- `lat` (number, required) - Latitude (-90 to 90)| GET | `/api/health` | Health check |npm run test:watch

- `lon` (number, required) - Longitude (-180 to 180)

| GET | `/api/weather/city/:cityName` | Get weather by city |```

**Example:**

```bash| GET | `/api/weather/coordinates?lat=&lon=` | Get weather by coordinates |

curl "http://localhost:5000/api/weather/coordinates?lat=51.5074&lon=-0.1278"

```| GET | `/api/weather/forecast/:cityName` | Get 5-day forecast |## 📁 Project Structure



#### 4. Get 5-Day Forecast| GET | `/api/weather/air-quality?lat=&lon=` | Get air quality data |

```http

GET /api/weather/forecast/:cityName| GET | `/api/weather/search/:query` | Search cities (geocoding) |```

```

backend/

**Parameters:**

- `cityName` (string, required) - Name of the cityFor detailed API documentation with request/response examples, see the main [README](../README.md#-api-documentation).├── src/



**Example:**│   ├── controllers/       # Request handlers

```bash

curl http://localhost:5000/api/weather/forecast/Paris## 🔒 Input Validation│   ├── middleware/        # Custom middleware

```

│   ├── routes/           # API routes

**Response:**

```jsonAll endpoints include input validation:│   ├── services/         # Business logic

{

  "success": true,│   ├── utils/            # Utility functions

  "data": {

    "city": "Paris",- **City Name:** Letters, spaces, Unicode characters (2-100 chars)│   └── server.js         # App entry point

    "country": "FR",

    "forecast": [- **Coordinates:** Latitude (-90 to 90), Longitude (-180 to 180)├── tests/                # Test files

      {

        "date": "2025-11-01",- **Search Query:** Minimum 2 characters├── .env                  # Environment variables

        "temperature": {

          "day": 16,├── .env.example          # Environment template

          "min": 12,

          "max": 18## ⚠️ Error Handling├── jest.config.js        # Jest configuration

        },

        "weather": {└── package.json

          "main": "Rain",

          "description": "light rain",Standardized error responses:```

          "icon": "10d"

        },```json

        "humidity": 80,

        "windSpeed": 6.2,{## 🐳 Docker Support

        "pop": 0.65

      }  "success": false,

      // ... 4 more days

    ]  "message": "Error description",Build Docker image:

  }

}  "type": "ErrorType",```bash

```

  "statusCode": 404docker build -t weather-app-backend .

#### 5. Get Air Quality

```http}```

GET /api/weather/air-quality?lat={latitude}&lon={longitude}

``````



**Query Parameters:**Run container:

- `lat` (number, required) - Latitude

- `lon` (number, required) - Longitude## 🔧 Configuration```bash



**Example:**docker run -p 5000:5000 --env-file .env weather-app-backend

```bash

curl "http://localhost:5000/api/weather/air-quality?lat=51.5074&lon=-0.1278"### Environment Variables```

```



**Response:**

```json| Variable | Required | Default | Description |## 🔧 Environment Variables

{

  "success": true,|----------|----------|---------|-------------|

  "data": {

    "aqi": 2,| `PORT` | No | 5000 | Server port || Variable | Description | Default |

    "aqiLevel": "Fair",

    "components": {| `NODE_ENV` | No | development | Environment ||----------|-------------|---------|

      "co": 250.34,

      "no": 0.01,| `OPENWEATHER_API_KEY` | Yes | - | API key || `OPENWEATHER_API_KEY` | OpenWeatherMap API key | Required |

      "no2": 15.52,

      "o3": 68.66,| `ALLOWED_ORIGINS` | No | * | CORS origins || `PORT` | Server port | 5000 |

      "so2": 0.64,

      "pm2_5": 8.32,| `NODE_ENV` | Environment (development/production) | development |

      "pm10": 11.45,

      "nh3": 0.92## 📞 Support| `ALLOWED_ORIGINS` | CORS allowed origins | * |

    },

    "timestamp": "2025-11-01T10:30:00.000Z"

  }

}For issues or questions, check the main [README](../README.md) or open an issue on GitHub.## 📝 API Response Format

```



#### 6. Search Cities (Geocoding)

```http---### Success Response

GET /api/weather/search/:query

``````json



**Parameters:**Made with ❤️ by Deep{

- `query` (string, required) - City name or partial name (min 2 chars)

  "success": true,

**Example:**  "data": {

```bash    // Response data

curl http://localhost:5000/api/weather/search/New  }

```}

```

**Response:**

```json### Error Response

{```json

  "success": true,{

  "data": [  "success": false,

    {  "message": "Error message",

      "name": "New York",  "type": "ErrorType"

      "country": "US",}

      "state": "New York",```

      "lat": 40.7128,

      "lon": -74.0060## 🚨 Error Handling

    },

    {The API handles various error types:

      "name": "New Delhi",- `ValidationError` (400) - Invalid input

      "country": "IN",- `ApiError` (4xx/5xx) - External API errors

      "state": "Delhi",- City not found (404)

      "lat": 28.6139,- Invalid API key (401)

      "lon": 77.2090- Rate limiting (429)

    }

    // ... more results## 📊 Code Quality

  ]

}This project is configured for:

```- **SonarQube** - Code quality analysis

- **Jest** - Unit testing with coverage

### Error Responses- **ESLint** - Code linting (to be added)



**404 - Not Found:**## 🤝 Contributing

```json

{1. Follow the existing code structure

  "success": false,2. Write tests for new features

  "message": "City not found",3. Ensure all tests pass before committing

  "type": "NotFoundError"4. Update documentation as needed

}

```## 📄 License



**400 - Bad Request:**ISC

```json
{
  "success": false,
  "message": "Invalid coordinates",
  "type": "ValidationError"
}
```

**500 - Internal Server Error:**
```json
{
  "success": false,
  "message": "Failed to fetch weather data",
  "type": "ApiError"
}
```

## 🧪 Testing

### Run Tests

```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm run test:watch

# Run specific test file
npm test weather.test.js
```

### Test Coverage

Current coverage: **41%**

Coverage thresholds configured in `jest.config.js`:
- Branches: 30%
- Functions: 20%
- Lines: 30%
- Statements: 30%

### Test Files

**tests/weather.test.js** - API endpoint tests:
- ✅ GET /api/health - Health check endpoint
- ✅ GET /api/weather/city/:cityName - Valid city
- ✅ GET /api/weather/city/:cityName - Invalid city
- ✅ GET /api/weather/coordinates - Valid coordinates
- ✅ GET /api/weather/coordinates - Invalid coordinates
- ✅ GET /api/weather/forecast/:cityName - Valid city
- ✅ GET /api/weather/forecast/:cityName - Invalid city
- ✅ GET /api/weather/search/:query - Valid query

**Latest Test Results:**
```
Test Suites: 1 passed, 1 total
Tests:       8 passed, 8 total
Time:        2.2s
Coverage:    41%
```

## 🐳 Docker

### Build Image

```bash
# Build backend image
docker build -t weather-app-backend .

# Build with custom tag
docker build -t deepdey01/weather-app-backend:v1.0 .
```

### Run Container

```bash
# Run with environment variables
docker run -d \
  -p 5000:5000 \
  -e OPENWEATHER_API_KEY=your_key \
  --name weather-backend \
  weather-app-backend

# Run with .env file
docker run -d \
  -p 5000:5000 \
  --env-file .env \
  --name weather-backend \
  weather-app-backend
```

### Multi-stage Dockerfile

The `Dockerfile` uses multi-stage builds for optimization:

```dockerfile
# Stage 1: Builder
FROM node:18-alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --only=production

# Stage 2: Production
FROM node:18-alpine
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY . .
EXPOSE 5000
CMD ["node", "src/server.js"]
```

## 🔐 Environment Variables

Required environment variables:

| Variable | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `OPENWEATHER_API_KEY` | string | Yes | - | OpenWeatherMap API key |
| `PORT` | number | No | 5000 | Server port |
| `NODE_ENV` | string | No | development | Environment (development/production/test) |
| `ALLOWED_ORIGINS` | string | No | * | CORS allowed origins |

## 🛠️ Development

### Project Scripts

```json
{
  "start": "node src/server.js",
  "dev": "nodemon src/server.js",
  "test": "jest --coverage",
  "test:watch": "jest --watch",
  "build": "npm run build:frontend",
  "build:frontend": "cd ../frontend && npm install && npm run build",
  "vercel-build": "cd ../frontend && npm install && npm run build"
}
```

### Code Structure Guidelines

**Controllers (`controllers/`):**
- Handle HTTP requests and responses
- Validate input parameters
- Call service layer functions
- Format responses using utils

**Services (`services/`):**
- Contain business logic
- Make external API calls
- Process and transform data
- No direct HTTP handling

**Middleware (`middleware/`):**
- Request validation
- Error handling
- Logging
- Authentication (if needed)

**Utils (`utils/`):**
- Helper functions
- Response formatters
- Logger configuration
- Constants

## 🔍 Debugging

### Enable Debug Logging

Set environment variable:
```bash
DEBUG=weather:* npm run dev
```

### Check Server Status

```bash
# Health check
curl http://localhost:5000/api/health

# Test specific endpoint
curl http://localhost:5000/api/weather/city/London
```

### Common Issues

**Server won't start:**
- Check if port 5000 is available: `netstat -ano | grep :5000`
- Verify `.env` file exists and has valid API key
- Ensure all dependencies are installed: `npm install`

**API returns 401:**
- Verify OpenWeatherMap API key is valid
- Check API key has necessary permissions

**Tests failing:**
- Ensure `NODE_ENV=test` is set during testing
- Check that server doesn't start in test mode
- Verify Jest configuration in `jest.config.js`

## 📊 Performance

- Average response time: < 200ms
- Concurrent requests: Supports 100+ simultaneous connections
- Memory usage: ~50MB idle, ~150MB under load
- Docker image size: ~150MB (optimized with multi-stage build)

## 🚀 Deployment

### Production Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Use strong API keys
- [ ] Configure CORS properly
- [ ] Enable logging
- [ ] Set up monitoring
- [ ] Configure health checks
- [ ] Use process manager (PM2)

### Deployment Options

1. **Docker (Recommended)**
2. **Vercel Serverless**
3. **Heroku**
4. **AWS EC2/ECS**
5. **DigitalOcean**

## 📝 License

This project is licensed under the ISC License.

## 👤 Author

**Deep Dey**
- GitHub: [@Deep-Dey1](https://github.com/Deep-Dey1)

---

**Last Updated:** November 2025
