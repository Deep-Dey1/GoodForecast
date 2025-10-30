# ⚛️ Frontend - Good Forecast# React + Vite



Modern React-based frontend for the Good Forecast weather application with responsive design.This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.



## 📋 OverviewCurrently, two official plugins are available:



Beautiful, responsive weather application interface built with React, Tailwind CSS, and DaisyUI. Features real-time weather data, interactive maps, air quality monitoring, and a clean dark theme UI.- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh

- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## 🛠️ Tech Stack

## React Compiler

- **React 19.1.1** - UI library

- **Vite 7.1.12** - Build tool & dev serverThe React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

- **Tailwind CSS 3.4.1** - Utility-first CSS framework

- **DaisyUI 5.3.10** - Component library (dark theme)## Expanding the ESLint configuration

- **Leaflet 1.9.4** - Interactive maps

- **React Leaflet 5.0.0** - React wrapper for LeafletIf you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

- **React Hot Toast 2.6.0** - Toast notifications
- **Axios 1.13.1** - HTTP client

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx              # Top navigation with search
│   │   ├── WeatherCard.jsx         # Current weather display
│   │   ├── ForecastCard.jsx        # 5-day forecast (4 on mobile, 5 on desktop)
│   │   ├── MapCard.jsx             # Interactive Leaflet map
│   │   ├── AirQualityCard.jsx      # Air quality index display
│   │   └── Layout.jsx              # Page layout wrapper
│   ├── services/
│   │   └── api.js                  # API client configuration
│   ├── App.jsx                     # Main application component
│   ├── main.jsx                    # Entry point
│   └── index.css                   # Global styles & Tailwind imports
├── public/
│   └── gif/
│       ├── morning.gif             # Morning animation
│       ├── afternoon.gif           # Afternoon animation
│       ├── evening.gif             # Evening animation
│       └── night.gif               # Night animation
├── index.html
├── package.json
├── vite.config.js                  # Vite configuration
├── tailwind.config.js              # Tailwind configuration
└── README.md                       # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend server running (see [backend README](../backend/README.md))

### Installation

1. **Install dependencies**
```bash
cd frontend
npm install
```

2. **Create environment file (optional)**

Create `.env` file for custom API URL:
```env
VITE_API_URL=http://localhost:5000/api
```

If not set, defaults to:
- **Development:** `http://localhost:5000/api`
- **Production:** `/api` (relative URL)

### Running the Application

**Development mode:**
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

**Build for production:**
```bash
npm run build
```

**Preview production build:**
```bash
npm run preview
```

## 🎨 Components

### Navbar
- **Mobile (<1024px):** Logo & search bar in first row, time info below
- **Desktop (≥1024px):** Single row with logo left, search center, time right
- Dynamic time-based greeting with animated GIFs
- City search with debouncing

### WeatherCard
- Current temperature, feels like, humidity, wind speed
- Weather description with icon
- Responsive text sizing

### ForecastCard
- **Mobile:** 4-day forecast in 2x2 grid
- **Desktop:** 5-day forecast in single row
- Day name, temperature, weather icon
- Responsive grid layout

### MapCard
- Interactive Leaflet map centered on selected city
- OpenStreetMap tiles
- City marker with popup
- Zoom controls

### AirQualityCard
- Air Quality Index (AQI) with quality level
- PM2.5, PM10, CO, NO2, SO2, O3 pollutant breakdown
- Time-based animated GIF
- Side-by-side layout (desktop only)

## 📱 Responsive Design

### Breakpoints
- **Mobile:** `< 1024px` (Tailwind: default, sm:, md:)
- **Desktop:** `≥ 1024px` (Tailwind: lg:, xl:)

### Responsive Features
- Navbar: 2-row layout on mobile, 1-row on desktop
- Forecast: 4 cards (2x2) on mobile, 5 cards (1x5) on desktop
- Text sizing: Smaller on mobile, larger on desktop
- Grid layouts: Adjusted columns for each breakpoint

## 🎨 Styling

### Tailwind Configuration
- **Theme:** DaisyUI dark theme only
- **Colors:** System defaults with dark theme overrides
- **Fonts:** System font stack
- **Spacing:** Standard Tailwind scale

### DaisyUI Components Used
- `card`, `card-body`, `card-title`
- `badge`
- `btn`
- `input`
- Custom dark theme styling

### Custom Styles
- Weather icons sized for visibility
- Map container with fixed height
- Animated GIF backgrounds
- Toast notification styling

## 🔌 API Integration

All API calls go through `src/services/api.js`:

```javascript
// Example usage
import { getWeatherByCity, getForecast } from './services/api';

const weather = await getWeatherByCity('London');
const forecast = await getForecast('London');
```

Available functions:
- `getWeatherByCity(cityName)`
- `getWeatherByCoordinates(lat, lon)`
- `getForecast(cityName)`
- `getAirQuality(lat, lon)`
- `searchCity(query)`
- `checkHealth()`

## 🧪 Development

### Hot Module Replacement (HMR)
Vite provides instant HMR for React components during development.

### ESLint Configuration
If you expand the ESLint config, update `parserOptions`:
```javascript
export default tseslint.config({
  languageOptions: {
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

## 📦 Build Output

Production build creates optimized static files in `dist/`:
```
dist/
├── assets/
│   ├── index-[hash].js
│   └── index-[hash].css
├── gif/
└── index.html
```

## 📞 Support

For issues or questions, check the main [README](../README.md) or open an issue on GitHub.

---

Made with ❤️ by Deep
