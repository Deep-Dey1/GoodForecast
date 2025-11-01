# 🌤️ GoodForecast - Weather Application# 🌤️ Good Forecast - Weather Application# 🌤️ Weather Forecasting Application



A full-stack weather application with comprehensive DevOps implementation featuring automated CI/CD pipeline, containerization, and quality assurance tools.



[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)]()A beautiful, responsive full-stack weather application that provides real-time weather data, 5-day forecasts, air quality information, and an interactive map interface.A full-stack weather forecasting application built with **Node.js**, **Express**, **React**, and **Tailwind CSS**, featuring complete **DevOps CI/CD pipeline** with Docker, Jenkins, and SonarQube.

[![Docker](https://img.shields.io/badge/docker-enabled-blue)]()

[![License](https://img.shields.io/badge/license-ISC-green)]()



## 🌟 Project Overview![Weather App](https://img.shields.io/badge/Status-Production-success)![License](https://img.shields.io/badge/license-ISC-blue)



GoodForecast is a modern weather application that provides real-time weather information with an interactive 3D globe visualization. The project demonstrates enterprise-grade DevOps practices including automated testing, continuous integration, containerization, and deployment automation.![React](https://img.shields.io/badge/React-19.1.1-blue)![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)



**Live Demo:** [https://goodforecast.deepdey.me](https://goodforecast.deepdey.me)![Node.js](https://img.shields.io/badge/Node.js-Express-green)![Docker](https://img.shields.io/badge/docker-ready-blue)



## 🏗️ Architecture![License](https://img.shields.io/badge/License-MIT-yellow)



```---

┌─────────────────────────────────────────────────────────────────┐

│                         GitHub Repository                        │## ✨ Features

│                    (Source Code Management)                      │

└────────────────────────┬────────────────────────────────────────┘## 📋 Table of Contents

                         │ Push/Commit

                         │ SCM Polling (Every 5 min)- 🌍 **Real-time Weather Data** - Get current weather for any city worldwide

                         ▼

┌─────────────────────────────────────────────────────────────────┐- 📅 **5-Day Forecast** - View detailed weather predictions with custom GIFs- [Features](#-features)

│                      Jenkins CI/CD Pipeline                      │

│  ┌──────────────────────────────────────────────────────────┐  │- 💨 **Air Quality Index** - Monitor air pollution levels with visual indicators- [Tech Stack](#-tech-stack)

│  │ 1. Checkout      → Git clone repository                  │  │

│  │ 2. Dependencies  → npm ci (Backend & Frontend)           │  │- 🗺️ **Interactive Map** - Click anywhere on the map to get weather data- [Project Structure](#-project-structure)

│  │ 3. Tests         → Jest unit tests + coverage            │  │

│  │ 4. Build         → Docker images (multi-stage)           │  │- 🔍 **Smart Search** - Autocomplete search with geocoding API- [Quick Start](#-quick-start)

│  │ 5. Deploy        → Test environment (Docker Compose)     │  │

│  │ 6. Health Check  → Container health verification         │  │- ⌨️ **Keyboard Navigation** - Arrow keys and Enter support for search- [DevOps Pipeline](#-devops-pipeline)

│  └──────────────────────────────────────────────────────────┘  │

└────────────────────────┬────────────────────────────────────────┘- 🌓 **Dark Theme** - Beautiful dark UI with gradient backgrounds- [API Documentation](#-api-documentation)

                         │

                         ▼- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile- [Testing](#-testing)

┌─────────────────────────────────────────────────────────────────┐

│                    Docker Hub Registry                           │- 🚀 **Auto-location** - Detects user location or defaults to NYC- [Deployment](#-deployment)

│         deepdey01/weather-app-backend:latest                    │

│         deepdey01/weather-app-frontend:latest                   │- 🔔 **Toast Notifications** - User-friendly error messages- [Contributing](#-contributing)

└─────────────────────────────────────────────────────────────────┘

                         │- 🕐 **Local Time Display** - Shows current time with sunrise/sunset

            ┌────────────┴────────────┐

            ▼                         ▼---

┌──────────────────────┐    ┌──────────────────────┐

│  Test Environment    │    │  Production (Vercel) │## 🛠️ Tech Stack

│   localhost:5001     │    │ goodforecast.deepdey │

│   localhost:3001     │    │       .me            │## ✨ Features

└──────────────────────┘    └──────────────────────┘

```### Frontend



## 🚀 Tech Stack- **React 19.1.1** - UI library### Application Features



### Frontend- **Vite 7.1.12** - Build tool and dev server- 🌡️ Real-time weather data for any city

- **Framework:** React 19.1.1 with Vite

- **Styling:** TailwindCSS + DaisyUI- **Tailwind CSS 3.4.1** - Utility-first CSS framework- 📍 Weather by coordinates (latitude/longitude)

- **Mapping:** React Leaflet, Mapbox GL

- **3D Visualization:** React Globe GL + Three.js- **DaisyUI 5.3.10** - Component library (Dark theme)- 📅 5-day weather forecast

- **HTTP Client:** Axios

- **Notifications:** React Hot Toast- **Leaflet 1.9.4** - Interactive maps- 🔍 City search with autocomplete



### Backend- **React Leaflet 5.0.0** - React components for Leaflet- 🌓 Beautiful, responsive UI with Tailwind CSS

- **Runtime:** Node.js 18.20.8

- **Framework:** Express.js- **React Hot Toast 2.6.0** - Toast notifications- 📱 Mobile-friendly design

- **API Integration:** OpenWeatherMap API

- **CORS:** Enabled for cross-origin requests- **Axios 1.13.1** - HTTP client

- **Environment:** dotenv configuration

### DevOps Features

### DevOps & Infrastructure

- **CI/CD:** Jenkins 2.528.1 LTS (Pipeline as Code)### Backend- 🐳 **Docker** - Containerized application

- **Containerization:** Docker 28.5.1 + Docker Compose V2

- **Testing:** Jest with 41% code coverage- **Node.js** - Runtime environment- 🔄 **Jenkins** - Automated CI/CD pipeline

- **Code Quality:** SonarQube LTS (configured)

- **Registry:** Docker Hub (deepdey01)- **Express 4.18.2** - Web framework- 📊 **SonarQube** - Code quality analysis

- **Deployment:** Vercel (Production), Docker (Test)

- **Version Control:** Git + GitHub- **Axios 1.4.0** - API requests- 🧪 **Jest** - Automated testing



## 📋 Prerequisites- **CORS** - Cross-origin resource sharing- 📈 **Code Coverage** - Test coverage reports



- **Node.js:** 18.x or higher- **dotenv** - Environment variable management- 🚀 **Vercel** - Production deployment

- **Docker:** 28.x or higher

- **Docker Compose:** V2 (plugin-based)

- **Git:** Latest version

- **OpenWeatherMap API Key:** [Get free key](https://openweathermap.org/api)### APIs---



## 🔧 Installation & Setup- **OpenWeatherMap API** - Weather data, forecasts, and geocoding



### 1. Clone Repository- **OpenStreetMap** - Map tiles and weather overlay## 🛠️ Tech Stack



```bash

git clone https://github.com/Deep-Dey1/GoodForecast.git

cd GoodForecast## 📁 Project Structure### Frontend

```

- React 18

### 2. Environment Configuration

```- Tailwind CSS

Create `.env` file in the `backend/` directory:

weatherApp/- Axios

```bash

cd backend├── backend/                 # Node.js/Express backend- React Router

cp .env.example .env

```│   ├── src/



Edit `.env` and add your OpenWeatherMap API key:│   │   ├── controllers/    # Request handlers### Backend



```env│   │   ├── routes/         # API routes- Node.js

OPENWEATHER_API_KEY=your_api_key_here

PORT=5000│   │   ├── services/       # Business logic- Express.js

```

│   │   ├── middleware/     # Custom middleware- OpenWeatherMap API

### 3. Local Development (Without Docker)

│   │   ├── utils/          # Utility functions- CORS

**Backend:**

```bash│   │   └── server.js       # Entry point- Dotenv

cd backend

npm install│   ├── package.json

npm run dev          # Development with nodemon

# OR│   └── README.md### DevOps

npm start            # Production mode

```├── frontend/               # React frontend- **Version Control:** Git + GitHub



**Frontend:**│   ├── src/- **CI/CD:** Jenkins

```bash

cd frontend│   │   ├── components/    # React components- **Containerization:** Docker + Docker Compose

npm install

npm run dev          # Starts on http://localhost:5173│   │   ├── services/      # API services- **Code Quality:** SonarQube

```

│   │   └── App.jsx        # Main component- **Testing:** Jest + Supertest

### 4. Docker Development

│   ├── public/- **Deployment:** Vercel

**Option A: Full Stack**

```bash│   ├── package.json

docker compose up --build

# Backend: http://localhost:5000│   └── README.md---

# Frontend: http://localhost:3000

```├── vercel.json            # Vercel deployment config



**Option B: Test Environment (CI/CD Ports)**├── DEPLOYMENT_GUIDE.md    # Deployment instructions## 📁 Project Structure

```bash

docker compose -f docker-compose.test.yml up└── README.md              # This file

# Backend: http://localhost:5001

# Frontend: http://localhost:3001``````

```

weatherApp/

## 🔄 DevOps Implementation

## 🚀 Quick Start├── backend/                    # Backend API

### CI/CD Pipeline Architecture

│   ├── src/

The project uses **Jenkins Pipeline as Code** with the following stages:

### Prerequisites│   │   ├── controllers/       # Request handlers

1. **Checkout** - Clone repository from GitHub

2. **Install Dependencies** - `npm ci` for backend and frontend- Node.js (v16 or higher)│   │   ├── middleware/        # Custom middleware

3. **Run Tests** - Jest unit tests with coverage reporting

4. **SonarQube Analysis** - Code quality and security scanning (non-blocking)- npm or yarn│   │   ├── routes/           # API routes

5. **Quality Gate** - SonarQube quality validation

6. **Build Docker Images** - Multi-stage builds for optimized images- OpenWeatherMap API key ([Get it free](https://openweathermap.org/api))│   │   ├── services/         # Business logic

7. **Deploy** - Deploy to test environment using Docker Compose

8. **Health Check** - Verify container health status│   │   ├── utils/            # Utilities



### Jenkins Configuration### Installation│   │   └── server.js         # Entry point



**Pipeline Job:** Weather-App-Pipeline│   ├── tests/                # Test files

- **Type:** Pipeline (Declarative)

- **SCM:** Git (https://github.com/Deep-Dey1/GoodForecast.git)1. **Clone the repository**│   ├── .env                  # Environment variables

- **Branch:** main

- **Script Path:** Jenkinsfile```bash│   ├── Dockerfile           # Backend container

- **Triggers:** SCM Polling (H/5 * * * *) - Every 5 minutes

git clone https://github.com/Deep-Dey1/GoodForecast.git│   └── package.json

**Required Plugins:**

- NodeJS Plugincd GoodForecast│

- Docker Pipeline

- Docker Plugin```├── frontend/                  # React frontend

- SonarQube Scanner

- Git Plugin│   ├── src/



**Configured Tools:**2. **Setup Backend**│   │   ├── components/       # React components

- NodeJS-18 (Node.js 18.x)

- docker (Docker CLI)```bash│   │   ├── pages/           # Page components

- SonarQubeScanner

cd backend│   │   ├── services/        # API calls

**Credentials:**

- `dockerhub-credentials` - Docker Hub (deepdey01)npm install│   │   └── App.jsx

- `sonarqube-token` - SonarQube authentication

```│   ├── Dockerfile           # Frontend container

### Infrastructure Services

│   └── package.json

Start CI/CD infrastructure:

Create `.env` file in backend folder:│

```bash

docker compose -f docker-compose.cicd.yml up -d```env├── docker-compose.yml        # Multi-container orchestration

```

PORT=5000├── Jenkinsfile              # CI/CD pipeline definition

**Services:**

- **Jenkins:** http://localhost:8080 (CI/CD automation)OPENWEATHER_API_KEY=your_api_key_here├── DEVOPS_GUIDE.md          # Complete DevOps setup guide

- **SonarQube:** http://localhost:9000 (Code quality)

- **PostgreSQL:** Port 5432 (SonarQube database)NODE_ENV=development├── GETTING_STARTED.md       # Quick start guide

- **Docker Registry:** Port 5000 (Local image registry)

ALLOWED_ORIGINS=http://localhost:5173└── README.md                # This file

### Docker Images

``````

**Backend Image:**

```dockerfile

FROM node:18-alpine (builder)

WORKDIR /usr/src/app3. **Setup Frontend**---

COPY package*.json ./

RUN npm ci --only=production```bash

COPY . .

EXPOSE 5000cd frontend## 🚀 Quick Start

CMD ["node", "src/server.js"]

```npm install



**Frontend Image:**```### Prerequisites

```dockerfile

FROM node:18-alpine (builder)- Node.js (v14 or higher)

WORKDIR /app

RUN npm ci && npm run buildCreate `.env` file in frontend folder (optional):- npm or yarn



FROM nginx:alpine (production)```env- Docker Desktop (for containerization)

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80VITE_API_URL=http://localhost:5000/api- Git

```

VITE_OPENWEATHER_API_KEY=your_api_key_here

**Published Images:**

- `deepdey01/weather-app-backend:latest````### 1. Clone the Repository

- `deepdey01/weather-app-frontend:latest`

```bash

### Testing Strategy

### Running Locallygit clone https://github.com/yourusername/weatherApp.git

**Backend Tests (Jest):**

- Unit tests for API endpointscd weatherApp

- Weather service integration tests

- Error handling validation**Development Mode (Separate servers):**```

- Current Coverage: 41%

- Coverage Threshold: 30% minimum



**Test Execution:**```bash### 2. Backend Setup

```bash

cd backend# Terminal 1 - Backend

npm test              # Run tests with coverage

npm run test:watch    # Watch mode for developmentcd backend```bash

```

npm run devcd backend

**Test Results (Latest Build #16):**

- Total Tests: 8

- Passed: 8 (100%)

- Failed: 0# Terminal 2 - Frontend# Install dependencies

- Execution Time: 2.2s

cd frontendnpm install

### Automated Deployment Flow

npm run dev

```

Developer Push → GitHub → Jenkins Polling → Build Trigger```# Create .env file from example

    ↓

Checkout Code → Install Dependencies → Run Testscp .env.example .env

    ↓

Build Docker Images → Tag with Build NumberAccess the app at `http://localhost:5173`

    ↓

Deploy to Test Environment (ports 5001, 3001)# Add your OpenWeatherMap API key to .env

    ↓

Health Check (Docker inspect) → SUCCESS**Production Mode (Single server):**# Get free API key from: https://openweathermap.org/api

    ↓

Notification: Build #XX SUCCESS ✅

```

```bash# Start development server

## 📊 Monitoring & Verification

# Build frontendnpm run dev

### Health Checks

cd frontend```

The pipeline verifies deployment health using Docker's built-in health status:

npm run build

```bash

# Check backend healthBackend will run on `http://localhost:5000`

docker inspect --format="{{.State.Health.Status}}" weather-app-backend-test

# Start backend (serves frontend)

# Check frontend status

docker inspect --format="{{.State.Status}}" weather-app-frontend-testcd backend### 3. Frontend Setup (Coming Soon)

```

NODE_ENV=production npm start

### Container Logs

``````bash

```bash

# Backend logscd frontend

docker logs weather-app-backend-test

Access the app at `http://localhost:5000`

# Frontend logs

docker logs weather-app-frontend-test# Install dependencies



# Jenkins logs## 🌐 Deploymentnpm install

docker logs weather-app-jenkins

```



### Access URLsThe app is configured for easy deployment to Vercel. See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed instructions.# Start development server



- **Production:** https://goodforecast.deepdey.menpm start

- **Test Backend API:** http://localhost:5001/api/weather?city=London

- **Test Frontend:** http://localhost:3001**Quick Deploy:**```

- **Jenkins Dashboard:** http://localhost:8080

- **SonarQube Dashboard:** http://localhost:9000```bash



## 🔐 Security & Best Practicesnpm install -g vercelFrontend will run on `http://localhost:3000`



- ✅ Environment variables for sensitive datavercel login

- ✅ `.dockerignore` for optimized image builds

- ✅ Multi-stage Docker builds (reduced image size)vercel --prod### 4. Using Docker

- ✅ Non-root user in containers

- ✅ Health checks for container monitoring```

- ✅ CORS configuration for API security

- ✅ Automated security scanning with SonarQube```bash

- ✅ Git hooks for pre-commit validation

Don't forget to add your `OPENWEATHER_API_KEY` environment variable in Vercel!# Build and run all services

## 📈 Performance Optimizations

docker-compose up --build

- **Docker Layer Caching:** Dependencies cached separately

- **Multi-stage Builds:** Smaller production images## 📚 API Documentation

- **Nginx for Frontend:** Optimized static file serving

- **Node.js Production Mode:** Enhanced performance# Run in background

- **Build Artifacts:** Images tagged with build numbers

### Backend API Endpointsdocker-compose up -d

## 🛠️ Troubleshooting



### Common Issues

- `GET /api/health` - Health check# Stop all services

**Port Conflicts:**

```bash- `GET /api/weather/city/:cityName` - Get weather by city namedocker-compose down

# Check what's using a port

netstat -ano | grep :8080- `GET /api/weather/coordinates?lat=&lon=` - Get weather by coordinates```



# Use test environment with different ports- `GET /api/weather/forecast/:cityName` - Get 5-day forecast

docker compose -f docker-compose.test.yml up

```- `GET /api/weather/air-quality?lat=&lon=` - Get air quality data---



**Docker Permission Issues:**- `GET /api/weather/search/:query` - Search cities (geocoding)

```bash

# Add user to docker group (Linux)## 🔄 DevOps Pipeline

sudo usermod -aG docker $USER

See [backend/README.md](./backend/README.md) for detailed API documentation.

# Restart Docker service

sudo systemctl restart docker### CI/CD Flow

```

## 🎨 Features in Detail

**Jenkins Container Can't Run Docker:**

```bash```

# Verify Docker CLI installed in Jenkins

docker exec weather-app-jenkins docker --version### Weather DisplayGitHub Push



# Recreate Jenkins with Docker CLI- Current temperature, feels like, humidity, pressure    ↓

docker compose -f docker-compose.cicd.yml up -d --force-recreate jenkins

```- Weather condition with custom animated GIFsJenkins Webhook Trigger



## 📝 Project Structure- Wind speed and direction    ↓



```- Min/max temperatures┌─────────────────────────────┐

GoodForecast/

├── backend/              # Node.js/Express API│  Checkout Code              │

│   ├── src/

│   │   ├── controllers/  # Route controllers### 5-Day Forecast└─────────────────────────────┘

│   │   ├── services/     # Business logic

│   │   ├── routes/       # API routes- Daily weather predictions    ↓

│   │   ├── middleware/   # Custom middleware

│   │   └── utils/        # Helper functions- Custom GIFs for 7 weather conditions (Clear, Heavy Rain, Light Rain, Thunder, Snow, Mist, Cloudy)┌─────────────────────────────┐

│   ├── tests/            # Jest tests

│   ├── Dockerfile        # Backend container- Min/max temperatures for each day│  Install Dependencies       │

│   ├── README.md         # Backend documentation

│   └── package.json- Chance of rain percentage│  - Backend                  │

├── frontend/             # React/Vite application

│   ├── src/│  - Frontend                 │

│   │   ├── components/   # React components

│   │   ├── services/     # API clients### Air Quality Index└─────────────────────────────┘

│   │   └── assets/       # Static resources

│   ├── Dockerfile        # Frontend container- Overall AQI score with color-coded levels (Good, Fair, Moderate, Poor, Very Poor)    ↓

│   ├── README.md         # Frontend documentation

│   └── package.json- 8 pollutant measurements: PM2.5, PM10, O₃, NO₂, SO₂, CO, NO, NH₃┌─────────────────────────────┐

├── Jenkinsfile           # CI/CD pipeline definition

├── docker-compose.yml    # Main application stack- Custom GIFs for 5 AQI levels│  Run Tests                  │

├── docker-compose.test.yml      # Test environment

├── docker-compose.cicd.yml      # CI/CD infrastructure- Side-by-side card layout with detailed information│  - Unit Tests               │

├── sonar-project.properties     # SonarQube config

├── vercel.json           # Vercel deployment config│  - Integration Tests        │

└── README.md             # This file

```### Interactive Map└─────────────────────────────┘



## 🤝 Contributing- Click anywhere to get weather    ↓



1. Fork the repository- Weather layer overlay┌─────────────────────────────┐

2. Create feature branch (`git checkout -b feature/AmazingFeature`)

3. Commit changes (`git commit -m 'Add some AmazingFeature'`)- Current location marker│  SonarQube Analysis         │

4. Push to branch (`git push origin feature/AmazingFeature`)

5. Open Pull Request- Smooth animations│  - Code Quality             │



## 📄 License│  - Security Scan            │



This project is licensed under the ISC License.### Smart Search│  - Code Coverage            │



## 👤 Author- Autocomplete with city suggestions└─────────────────────────────┘



**Deep Dey**- Keyboard navigation (↑↓ arrows, Enter, Escape)    ↓

- GitHub: [@Deep-Dey1](https://github.com/Deep-Dey1)

- Docker Hub: [deepdey01](https://hub.docker.com/u/deepdey01)- Shows city name, state, and country┌─────────────────────────────┐



## 🙏 Acknowledgments- Coordinate display│  Quality Gate Check         │



- OpenWeatherMap API for weather data- Dropdown closes properly after selection└─────────────────────────────┘

- Jenkins for CI/CD automation

- Docker for containerization    ↓

- Vercel for production hosting

- SonarQube for code quality analysis### Responsive Design┌─────────────────────────────┐



---- **Desktop (≥1024px)**: Two-column layout with fixed navbar, 5 forecast cards│  Build Docker Images        │



**Build Status:** ✅ Build #16 - SUCCESS (All stages passed)  - **Mobile (<1024px)**: Vertical scroll with fixed navbar, 4 forecast cards in 2x2 grid│  - Backend Image            │

**Last Updated:** November 2025

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
