# 🌤️ Good Forecast - Weather Application# 🌤️ Weather Forecasting Application



A beautiful, responsive full-stack weather application that provides real-time weather data, 5-day forecasts, air quality information, and an interactive map interface.A full-stack weather forecasting application built with **Node.js**, **Express**, **React**, and **Tailwind CSS**, featuring complete **DevOps CI/CD pipeline** with Docker, Jenkins, and SonarQube.



![Weather App](https://img.shields.io/badge/Status-Production-success)![License](https://img.shields.io/badge/license-ISC-blue)

![React](https://img.shields.io/badge/React-19.1.1-blue)![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)

![Node.js](https://img.shields.io/badge/Node.js-Express-green)![Docker](https://img.shields.io/badge/docker-ready-blue)

![License](https://img.shields.io/badge/License-MIT-yellow)

---

## ✨ Features

## 📋 Table of Contents

- 🌍 **Real-time Weather Data** - Get current weather for any city worldwide

- 📅 **5-Day Forecast** - View detailed weather predictions with custom GIFs- [Features](#-features)

- 💨 **Air Quality Index** - Monitor air pollution levels with visual indicators- [Tech Stack](#-tech-stack)

- 🗺️ **Interactive Map** - Click anywhere on the map to get weather data- [Project Structure](#-project-structure)

- 🔍 **Smart Search** - Autocomplete search with geocoding API- [Quick Start](#-quick-start)

- ⌨️ **Keyboard Navigation** - Arrow keys and Enter support for search- [DevOps Pipeline](#-devops-pipeline)

- 🌓 **Dark Theme** - Beautiful dark UI with gradient backgrounds- [API Documentation](#-api-documentation)

- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile- [Testing](#-testing)

- 🚀 **Auto-location** - Detects user location or defaults to NYC- [Deployment](#-deployment)

- 🔔 **Toast Notifications** - User-friendly error messages- [Contributing](#-contributing)

- 🕐 **Local Time Display** - Shows current time with sunrise/sunset

---

## 🛠️ Tech Stack

## ✨ Features

### Frontend

- **React 19.1.1** - UI library### Application Features

- **Vite 7.1.12** - Build tool and dev server- 🌡️ Real-time weather data for any city

- **Tailwind CSS 3.4.1** - Utility-first CSS framework- 📍 Weather by coordinates (latitude/longitude)

- **DaisyUI 5.3.10** - Component library (Dark theme)- 📅 5-day weather forecast

- **Leaflet 1.9.4** - Interactive maps- 🔍 City search with autocomplete

- **React Leaflet 5.0.0** - React components for Leaflet- 🌓 Beautiful, responsive UI with Tailwind CSS

- **React Hot Toast 2.6.0** - Toast notifications- 📱 Mobile-friendly design

- **Axios 1.13.1** - HTTP client

### DevOps Features

### Backend- 🐳 **Docker** - Containerized application

- **Node.js** - Runtime environment- 🔄 **Jenkins** - Automated CI/CD pipeline

- **Express 4.18.2** - Web framework- 📊 **SonarQube** - Code quality analysis

- **Axios 1.4.0** - API requests- 🧪 **Jest** - Automated testing

- **CORS** - Cross-origin resource sharing- 📈 **Code Coverage** - Test coverage reports

- **dotenv** - Environment variable management- 🚀 **Vercel** - Production deployment



### APIs---

- **OpenWeatherMap API** - Weather data, forecasts, and geocoding

- **OpenStreetMap** - Map tiles and weather overlay## 🛠️ Tech Stack



## 📁 Project Structure### Frontend

- React 18

```- Tailwind CSS

weatherApp/- Axios

├── backend/                 # Node.js/Express backend- React Router

│   ├── src/

│   │   ├── controllers/    # Request handlers### Backend

│   │   ├── routes/         # API routes- Node.js

│   │   ├── services/       # Business logic- Express.js

│   │   ├── middleware/     # Custom middleware- OpenWeatherMap API

│   │   ├── utils/          # Utility functions- CORS

│   │   └── server.js       # Entry point- Dotenv

│   ├── package.json

│   └── README.md### DevOps

├── frontend/               # React frontend- **Version Control:** Git + GitHub

│   ├── src/- **CI/CD:** Jenkins

│   │   ├── components/    # React components- **Containerization:** Docker + Docker Compose

│   │   ├── services/      # API services- **Code Quality:** SonarQube

│   │   └── App.jsx        # Main component- **Testing:** Jest + Supertest

│   ├── public/- **Deployment:** Vercel

│   ├── package.json

│   └── README.md---

├── vercel.json            # Vercel deployment config

├── DEPLOYMENT_GUIDE.md    # Deployment instructions## 📁 Project Structure

└── README.md              # This file

``````

weatherApp/

## 🚀 Quick Start├── backend/                    # Backend API

│   ├── src/

### Prerequisites│   │   ├── controllers/       # Request handlers

- Node.js (v16 or higher)│   │   ├── middleware/        # Custom middleware

- npm or yarn│   │   ├── routes/           # API routes

- OpenWeatherMap API key ([Get it free](https://openweathermap.org/api))│   │   ├── services/         # Business logic

│   │   ├── utils/            # Utilities

### Installation│   │   └── server.js         # Entry point

│   ├── tests/                # Test files

1. **Clone the repository**│   ├── .env                  # Environment variables

```bash│   ├── Dockerfile           # Backend container

git clone https://github.com/Deep-Dey1/GoodForecast.git│   └── package.json

cd GoodForecast│

```├── frontend/                  # React frontend

│   ├── src/

2. **Setup Backend**│   │   ├── components/       # React components

```bash│   │   ├── pages/           # Page components

cd backend│   │   ├── services/        # API calls

npm install│   │   └── App.jsx

```│   ├── Dockerfile           # Frontend container

│   └── package.json

Create `.env` file in backend folder:│

```env├── docker-compose.yml        # Multi-container orchestration

PORT=5000├── Jenkinsfile              # CI/CD pipeline definition

OPENWEATHER_API_KEY=your_api_key_here├── DEVOPS_GUIDE.md          # Complete DevOps setup guide

NODE_ENV=development├── GETTING_STARTED.md       # Quick start guide

ALLOWED_ORIGINS=http://localhost:5173└── README.md                # This file

``````



3. **Setup Frontend**---

```bash

cd frontend## 🚀 Quick Start

npm install

```### Prerequisites

- Node.js (v14 or higher)

Create `.env` file in frontend folder (optional):- npm or yarn

```env- Docker Desktop (for containerization)

VITE_API_URL=http://localhost:5000/api- Git

VITE_OPENWEATHER_API_KEY=your_api_key_here

```### 1. Clone the Repository

```bash

### Running Locallygit clone https://github.com/yourusername/weatherApp.git

cd weatherApp

**Development Mode (Separate servers):**```



```bash### 2. Backend Setup

# Terminal 1 - Backend

cd backend```bash

npm run devcd backend



# Terminal 2 - Frontend# Install dependencies

cd frontendnpm install

npm run dev

```# Create .env file from example

cp .env.example .env

Access the app at `http://localhost:5173`

# Add your OpenWeatherMap API key to .env

**Production Mode (Single server):**# Get free API key from: https://openweathermap.org/api



```bash# Start development server

# Build frontendnpm run dev

cd frontend```

npm run build

Backend will run on `http://localhost:5000`

# Start backend (serves frontend)

cd backend### 3. Frontend Setup (Coming Soon)

NODE_ENV=production npm start

``````bash

cd frontend

Access the app at `http://localhost:5000`

# Install dependencies

## 🌐 Deploymentnpm install



The app is configured for easy deployment to Vercel. See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed instructions.# Start development server

npm start

**Quick Deploy:**```

```bash

npm install -g vercelFrontend will run on `http://localhost:3000`

vercel login

vercel --prod### 4. Using Docker

```

```bash

Don't forget to add your `OPENWEATHER_API_KEY` environment variable in Vercel!# Build and run all services

docker-compose up --build

## 📚 API Documentation

# Run in background

### Backend API Endpointsdocker-compose up -d



- `GET /api/health` - Health check# Stop all services

- `GET /api/weather/city/:cityName` - Get weather by city namedocker-compose down

- `GET /api/weather/coordinates?lat=&lon=` - Get weather by coordinates```

- `GET /api/weather/forecast/:cityName` - Get 5-day forecast

- `GET /api/weather/air-quality?lat=&lon=` - Get air quality data---

- `GET /api/weather/search/:query` - Search cities (geocoding)

## 🔄 DevOps Pipeline

See [backend/README.md](./backend/README.md) for detailed API documentation.

### CI/CD Flow

## 🎨 Features in Detail

```

### Weather DisplayGitHub Push

- Current temperature, feels like, humidity, pressure    ↓

- Weather condition with custom animated GIFsJenkins Webhook Trigger

- Wind speed and direction    ↓

- Min/max temperatures┌─────────────────────────────┐

│  Checkout Code              │

### 5-Day Forecast└─────────────────────────────┘

- Daily weather predictions    ↓

- Custom GIFs for 7 weather conditions (Clear, Heavy Rain, Light Rain, Thunder, Snow, Mist, Cloudy)┌─────────────────────────────┐

- Min/max temperatures for each day│  Install Dependencies       │

- Chance of rain percentage│  - Backend                  │

│  - Frontend                 │

### Air Quality Index└─────────────────────────────┘

- Overall AQI score with color-coded levels (Good, Fair, Moderate, Poor, Very Poor)    ↓

- 8 pollutant measurements: PM2.5, PM10, O₃, NO₂, SO₂, CO, NO, NH₃┌─────────────────────────────┐

- Custom GIFs for 5 AQI levels│  Run Tests                  │

- Side-by-side card layout with detailed information│  - Unit Tests               │

│  - Integration Tests        │

### Interactive Map└─────────────────────────────┘

- Click anywhere to get weather    ↓

- Weather layer overlay┌─────────────────────────────┐

- Current location marker│  SonarQube Analysis         │

- Smooth animations│  - Code Quality             │

│  - Security Scan            │

### Smart Search│  - Code Coverage            │

- Autocomplete with city suggestions└─────────────────────────────┘

- Keyboard navigation (↑↓ arrows, Enter, Escape)    ↓

- Shows city name, state, and country┌─────────────────────────────┐

- Coordinate display│  Quality Gate Check         │

- Dropdown closes properly after selection└─────────────────────────────┘

    ↓

### Responsive Design┌─────────────────────────────┐

- **Desktop (≥1024px)**: Two-column layout with fixed navbar, 5 forecast cards│  Build Docker Images        │

- **Mobile (<1024px)**: Vertical scroll with fixed navbar, 4 forecast cards in 2x2 grid│  - Backend Image            │

- **Tablet**: Optimized layouts for mid-size screens│  - Frontend Image           │

- Dynamic component sizing based on screen width└─────────────────────────────┘

    ↓

## 🤝 Contributing┌─────────────────────────────┐

│  Deploy to Environment      │

Contributions are welcome! Please feel free to submit a Pull Request.│  - Local/Staging/Production │

└─────────────────────────────┘

## 📝 License    ↓

┌─────────────────────────────┐

This project is licensed under the MIT License.│  Health Checks              │

└─────────────────────────────┘

## 👤 Author```



**Deep Dey**### Setting Up DevOps Tools

- GitHub: [@Deep-Dey1](https://github.com/Deep-Dey1)

- Repository: [GoodForecast](https://github.com/Deep-Dey1/GoodForecast)**Complete step-by-step guide:** See [DEVOPS_GUIDE.md](./DEVOPS_GUIDE.md)



## 🙏 Acknowledgments**Quick Setup:**

```bash

- [OpenWeatherMap](https://openweathermap.org/) for weather data API# Install Docker Desktop

- [OpenStreetMap](https://www.openstreetmap.org/) for map tiles# Download from: https://www.docker.com/products/docker-desktop

- [Giphy](https://giphy.com/) for weather animation GIFs

- [DaisyUI](https://daisyui.com/) for beautiful UI components# Run Jenkins (Docker)

- [Leaflet](https://leafletjs.com/) for interactive mapsdocker run -d -p 8080:8080 -p 50000:50000 \

  -v jenkins_home:/var/jenkins_home \

## 📞 Support  --name jenkins jenkins/jenkins:lts



If you have any questions or run into issues, please open an issue on GitHub.# Run SonarQube (Docker)

docker run -d --name sonarqube -p 9000:9000 sonarqube:community

---```



Made with ❤️ by Deep**Access URLs:**

- Jenkins: http://localhost:8080
- SonarQube: http://localhost:9000
- Backend API: http://localhost:5000
- Frontend: http://localhost:3000

---

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### Health Check
```http
GET /api/health
```
Returns service health status.

#### Get Weather by City
```http
GET /api/weather/city/:cityName
```
**Example:**
```bash
curl http://localhost:5000/api/weather/city/London
```

#### Get Weather by Coordinates
```http
GET /api/weather/coordinates?lat={latitude}&lon={longitude}
```
**Example:**
```bash
curl http://localhost:5000/api/weather/coordinates?lat=51.5074&lon=-0.1278
```

#### Get 5-Day Forecast
```http
GET /api/weather/forecast/:cityName
```
**Example:**
```bash
curl http://localhost:5000/api/weather/forecast/Paris
```

#### Search Cities
```http
GET /api/weather/search/:query
```
**Example:**
```bash
curl http://localhost:5000/api/weather/search/New
```

### Response Format

**Success Response:**
```json
{
  "success": true,
  "data": {
    "city": "London",
    "temperature": {
      "current": 15,
      "feelsLike": 13,
      "min": 12,
      "max": 18
    },
    "weather": {
      "main": "Clouds",
      "description": "scattered clouds"
    }
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "City not found",
  "type": "ApiError"
}
```

---

## 🧪 Testing

### Run Backend Tests
```bash
cd backend

# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Run in watch mode
npm run test:watch
```

### Run Frontend Tests
```bash
cd frontend

# Run all tests
npm test

# Run with coverage
npm test -- --coverage
```

### Code Coverage Reports
- Backend: `backend/coverage/index.html`
- Frontend: `frontend/coverage/index.html`

---

## 🚀 Deployment

### Vercel Deployment (Frontend)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
cd frontend
vercel --prod
```

### Backend Deployment Options

1. **Heroku**
2. **AWS EC2**
3. **DigitalOcean**
4. **Railway**

Detailed deployment guides coming soon!

---

## 📊 Code Quality Metrics

The project maintains high code quality standards:

- ✅ **Test Coverage:** > 80%
- ✅ **Code Smells:** Minimal
- ✅ **Security Vulnerabilities:** None
- ✅ **Duplications:** < 3%
- ✅ **Maintainability Rating:** A

View detailed reports in SonarQube dashboard.

---

## 🔐 Environment Variables

### Backend (.env)
```env
OPENWEATHER_API_KEY=your_api_key_here
PORT=5000
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:3000
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 🐛 Troubleshooting

### Common Issues

**Backend won't start:**
- Check if port 5000 is available
- Verify API key is set in `.env`
- Ensure all dependencies are installed

**Docker issues:**
- Make sure Docker Desktop is running
- Check port conflicts
- Try rebuilding: `docker-compose up --build`

**Jenkins pipeline fails:**
- Verify all plugins are installed
- Check tool configurations
- Ensure SonarQube is running

For detailed troubleshooting, see [DEVOPS_GUIDE.md](./DEVOPS_GUIDE.md)

---

## 📚 Learning Resources

- [OpenWeatherMap API Docs](https://openweathermap.org/api)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [React Documentation](https://react.dev/)
- [Docker Documentation](https://docs.docker.com/)
- [Jenkins Pipeline Syntax](https://www.jenkins.io/doc/book/pipeline/syntax/)
- [SonarQube Documentation](https://docs.sonarqube.org/)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the ISC License.

---

## 👤 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Repository: [GoodForecast](https://github.com/Deep-Dey1/GoodForecast)

---

## 🎯 Project Status

- ✅ Backend API - **Complete**
- 🔄 Frontend - **In Progress**
- ✅ Docker Setup - **Complete**
- ✅ Jenkins Pipeline - **Complete**
- ✅ SonarQube Integration - **Complete**
- 🔄 Vercel Deployment - **Pending**

---

## 🙏 Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) for providing free weather API
- [Jenkins](https://www.jenkins.io/) for CI/CD automation
- [SonarQube](https://www.sonarqube.org/) for code quality analysis
- [Docker](https://www.docker.com/) for containerization

---

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Check the [DEVOPS_GUIDE.md](./DEVOPS_GUIDE.md) for detailed setup instructions
- Read [GETTING_STARTED.md](./GETTING_STARTED.md) for quick start help

---

**Made with ❤️ and ☕**
