# 🌐 Weather App Frontend# ⚛️ Frontend - Good Forecast# React + Vite



A modern, responsive React application providing beautiful weather visualization with interactive maps and 3D globe interface.



## 📋 OverviewModern React-based frontend for the Good Forecast weather application with responsive design.This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.



The frontend is a single-page application built with React and Vite, featuring real-time weather data display, 5-day forecasts, air quality monitoring, and interactive mapping capabilities.



## 🎨 Features## 📋 OverviewCurrently, two official plugins are available:



### Core Functionality

- 🌤️ **Real-time Weather** - Current conditions for any city worldwide

- 📅 **5-Day Forecast** - Detailed predictions with custom weather GIFsBeautiful, responsive weather application interface built with React, Tailwind CSS, and DaisyUI. Features real-time weather data, interactive maps, air quality monitoring, and a clean dark theme UI.- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh

- 💨 **Air Quality Index** - Color-coded pollution levels with pollutant breakdown

- 🗺️ **Interactive Maps** - Click-to-search with Leaflet and Mapbox- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

- 🌍 **3D Globe Visualization** - React Globe GL with Three.js rendering

- 🔍 **Smart Search** - Autocomplete with keyboard navigation (↑↓ arrows, Enter, Esc)## 🛠️ Tech Stack

- 📍 **Geolocation** - Auto-detect user location or default to NYC

- 🕐 **Local Time Display** - Current time with sunrise/sunset information## React Compiler



### User Experience- **React 19.1.1** - UI library

- 🌓 **Dark Theme** - Beautiful dark UI with gradient backgrounds

- 📱 **Fully Responsive** - Desktop, tablet, and mobile optimized- **Vite 7.1.12** - Build tool & dev serverThe React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

- ⌨️ **Keyboard Navigation** - Full keyboard support for accessibility

- 🔔 **Toast Notifications** - User-friendly success/error messages- **Tailwind CSS 3.4.1** - Utility-first CSS framework

- ⚡ **Fast Loading** - Optimized with Vite build system

- 🎭 **Weather GIFs** - Custom animations for 7+ weather conditions- **DaisyUI 5.3.10** - Component library (dark theme)## Expanding the ESLint configuration



## 🚀 Tech Stack- **Leaflet 1.9.4** - Interactive maps



### Core Framework- **React Leaflet 5.0.0** - React wrapper for LeafletIf you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

- **React:** 19.1.1 - Component-based UI library

- **Vite:** 7.1.7 - Next-generation build tool- **React Hot Toast 2.6.0** - Toast notifications

- **React DOM:** 19.1.1 - React rendering- **Axios 1.13.1** - HTTP client



### Styling & UI## 📁 Project Structure

- **TailwindCSS:** 3.4.1 - Utility-first CSS framework

- **DaisyUI:** 5.3.10 - Component library (dark theme)```

- **PostCSS:** 8.5.6 - CSS transformationsfrontend/

- **Autoprefixer:** 10.4.21 - CSS vendor prefixes├── src/

│   ├── components/

### Mapping & Visualization│   │   ├── Navbar.jsx              # Top navigation with search

- **Leaflet:** 1.9.4 - Interactive map library│   │   ├── WeatherCard.jsx         # Current weather display

- **React Leaflet:** 5.0.0 - React components for Leaflet│   │   ├── ForecastCard.jsx        # 5-day forecast (4 on mobile, 5 on desktop)

- **Mapbox GL:** 3.16.0 - Vector maps and geocoding│   │   ├── MapCard.jsx             # Interactive Leaflet map

- **React Globe GL:** 2.36.0 - 3D globe visualization│   │   ├── AirQualityCard.jsx      # Air quality index display

- **Three.js:** 0.180.0 - 3D rendering engine│   │   └── Layout.jsx              # Page layout wrapper

│   ├── services/

### HTTP & State│   │   └── api.js                  # API client configuration

- **Axios:** 1.13.1 - Promise-based HTTP client│   ├── App.jsx                     # Main application component

- **React Hot Toast:** 2.6.0 - Beautiful toast notifications│   ├── main.jsx                    # Entry point

│   └── index.css                   # Global styles & Tailwind imports

### Development Tools├── public/

- **ESLint:** 9.36.0 - Code linting│   └── gif/

- **Vite Plugin React:** 5.0.4 - React Fast Refresh│       ├── morning.gif             # Morning animation

- **TypeScript Types:** React type definitions│       ├── afternoon.gif           # Afternoon animation

│       ├── evening.gif             # Evening animation

## 📁 Project Structure│       └── night.gif               # Night animation

├── index.html

```├── package.json

frontend/├── vite.config.js                  # Vite configuration

├── src/├── tailwind.config.js              # Tailwind configuration

│   ├── components/           # React components└── README.md                       # This file

│   │   ├── WeatherCard.jsx       # Main weather display```

│   │   ├── ForecastCard.jsx      # 5-day forecast

│   │   ├── AirQuality.jsx        # AQI display## 🚀 Getting Started

│   │   ├── MapView.jsx           # Interactive map

│   │   ├── SearchBar.jsx         # City search with autocomplete### Prerequisites

│   │   ├── GlobeView.jsx         # 3D globe visualization

│   │   └── ...- Node.js (v16 or higher)

│   ├── services/             # API integration- npm or yarn

│   │   ├── weatherService.js     # Backend API calls- Backend server running (see [backend README](../backend/README.md))

│   │   └── mapService.js         # Map data handling

│   ├── assets/               # Static resources### Installation

│   │   ├── images/               # Icons and images

│   │   └── gifs/                 # Weather condition GIFs1. **Install dependencies**

│   ├── App.jsx               # Root component```bash

│   ├── App.css               # Component stylescd frontend

│   ├── main.jsx              # Application entrynpm install

│   └── index.css             # Global styles (Tailwind)```

├── public/                   # Static public files

├── index.html                # HTML template2. **Create environment file (optional)**

├── vite.config.js            # Vite configuration

├── tailwind.config.js        # Tailwind configurationCreate `.env` file for custom API URL:

├── postcss.config.js         # PostCSS configuration```env

├── eslint.config.js          # ESLint rulesVITE_API_URL=http://localhost:5000/api

├── package.json              # Dependencies```

├── Dockerfile                # Container definition

└── README.md                 # This fileIf not set, defaults to:

```- **Development:** `http://localhost:5000/api`

- **Production:** `/api` (relative URL)

## 🔧 Installation & Setup

### Running the Application

### Prerequisites

**Development mode:**

- Node.js 18.x or higher (Node 20+ recommended for Vite)```bash

- npm or yarnnpm run dev

- Backend API running on `http://localhost:5000````



### Local SetupFrontend will run on `http://localhost:5173`



1. **Navigate to frontend directory:****Build for production:**

   ```bash```bash

   cd frontendnpm run build

   ``````



2. **Install dependencies:****Preview production build:**

   ```bash```bash

   npm installnpm run preview

   ``````



3. **Configure environment (optional):**## 🎨 Components

   

   Create `.env` file:### Navbar

   ```env- **Mobile (<1024px):** Logo & search bar in first row, time info below

   VITE_API_URL=http://localhost:5000/api- **Desktop (≥1024px):** Single row with logo left, search center, time right

   VITE_MAPBOX_TOKEN=your_mapbox_token_here- Dynamic time-based greeting with animated GIFs

   ```- City search with debouncing



4. **Start development server:**### WeatherCard

   ```bash- Current temperature, feels like, humidity, wind speed

   npm run dev- Weather description with icon

   ```- Responsive text sizing

   Application runs on `http://localhost:5173`

### ForecastCard

5. **Build for production:**- **Mobile:** 4-day forecast in 2x2 grid

   ```bash- **Desktop:** 5-day forecast in single row

   npm run build- Day name, temperature, weather icon

   ```- Responsive grid layout

   Output in `dist/` folder

### MapCard

6. **Preview production build:**- Interactive Leaflet map centered on selected city

   ```bash- OpenStreetMap tiles

   npm run preview- City marker with popup

   ```- Zoom controls



## 🎯 Usage### AirQualityCard

- Air Quality Index (AQI) with quality level

### Search for Weather- PM2.5, PM10, CO, NO2, SO2, O3 pollutant breakdown

- Time-based animated GIF

1. **By City Name:**- Side-by-side layout (desktop only)

   - Click search bar

   - Type city name (min 2 characters)## 📱 Responsive Design

   - Select from autocomplete dropdown

   - Use arrow keys (↑↓) and Enter for keyboard navigation### Breakpoints

- **Mobile:** `< 1024px` (Tailwind: default, sm:, md:)

2. **By Map Click:**- **Desktop:** `≥ 1024px` (Tailwind: lg:, xl:)

   - Click anywhere on the interactive map

   - Weather data loads automatically for clicked location### Responsive Features

- Navbar: 2-row layout on mobile, 1-row on desktop

3. **By Geolocation:**- Forecast: 4 cards (2x2) on mobile, 5 cards (1x5) on desktop

   - Allow browser location access- Text sizing: Smaller on mobile, larger on desktop

   - App automatically detects and shows local weather- Grid layouts: Adjusted columns for each breakpoint

   - Falls back to New York City if denied

## 🎨 Styling

### View Weather Information

### Tailwind Configuration

**Current Weather Card:**- **Theme:** DaisyUI dark theme only

- Temperature (current, feels like, min/max)- **Colors:** System defaults with dark theme overrides

- Weather condition with animated GIF- **Fonts:** System font stack

- Humidity and pressure- **Spacing:** Standard Tailwind scale

- Wind speed and direction

- Sunrise and sunset times### DaisyUI Components Used

- Local time display- `card`, `card-body`, `card-title`

- `badge`

**5-Day Forecast:**- `btn`

- Daily temperature predictions- `input`

- Weather condition GIFs- Custom dark theme styling

- Min/max temperatures

- Chance of precipitation### Custom Styles

- Scroll horizontally on mobile- Weather icons sized for visibility

- Map container with fixed height

**Air Quality Index:**- Animated GIF backgrounds

- Overall AQI score (1-5 scale)- Toast notification styling

- Color-coded quality level

- 8 pollutant measurements:## 🔌 API Integration

  - PM2.5, PM10 (Particulate Matter)

  - O₃ (Ozone)All API calls go through `src/services/api.js`:

  - NO₂ (Nitrogen Dioxide)

  - SO₂ (Sulfur Dioxide)```javascript

  - CO (Carbon Monoxide)// Example usage

  - NO (Nitric Oxide)import { getWeatherByCity, getForecast } from './services/api';

  - NH₃ (Ammonia)

const weather = await getWeatherByCity('London');

## 🎨 Responsive Designconst forecast = await getForecast('London');

```

### Desktop (≥ 1024px)

- Two-column layoutAvailable functions:

- Fixed navigation bar- `getWeatherByCity(cityName)`

- 5 forecast cards in horizontal row- `getWeatherByCoordinates(lat, lon)`

- Large map and globe views- `getForecast(cityName)`

- Side-by-side weather and AQI cards- `getAirQuality(lat, lon)`

- `searchCity(query)`

### Tablet (768px - 1024px)- `checkHealth()`

- Single column layout

- Stacked components## 🧪 Development

- 3-4 forecast cards visible

- Medium-sized map### Hot Module Replacement (HMR)

- Optimized touch targetsVite provides instant HMR for React components during development.



### Mobile (< 768px)### ESLint Configuration

- Vertical scroll layoutIf you expand the ESLint config, update `parserOptions`:

- Fixed navbar```javascript

- 2x2 grid for forecast cardsexport default tseslint.config({

- Full-width components  languageOptions: {

- Swipeable cards    parserOptions: {

- Bottom navigation      project: ['./tsconfig.node.json', './tsconfig.app.json'],

      tsconfigRootDir: import.meta.dirname,

## 🐳 Docker    },

  },

### Build Image})

```

```bash

# Build frontend image## 📦 Build Output

docker build -t weather-app-frontend .

Production build creates optimized static files in `dist/`:

# Build with custom tag```

docker build -t deepdey01/weather-app-frontend:v1.0 .dist/

```├── assets/

│   ├── index-[hash].js

### Run Container│   └── index-[hash].css

├── gif/

```bash└── index.html

# Run with default settings```

docker run -d \

  -p 3000:80 \## 📞 Support

  --name weather-frontend \

  weather-app-frontendFor issues or questions, check the main [README](../README.md) or open an issue on GitHub.



# Run with custom backend URL---

docker run -d \

  -p 3000:80 \Made with ❤️ by Deep

  -e VITE_API_URL=http://backend:5000/api \
  --name weather-frontend \
  weather-app-frontend
```

### Multi-stage Dockerfile

The `Dockerfile` uses multi-stage builds:

```dockerfile
# Stage 1: Builder
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Production (Nginx)
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 🧪 Testing

### Current Status

Frontend tests are configured with a placeholder:

```bash
# Run tests
npm test
```

Output: `"No frontend tests configured yet"`

### Future Testing Implementation

Planned testing stack:
- **Jest** - Test runner
- **React Testing Library** - Component testing
- **@testing-library/user-event** - User interaction simulation
- **MSW (Mock Service Worker)** - API mocking

Test coverage goals:
- Unit tests for all components
- Integration tests for API calls
- E2E tests for user flows
- Accessibility tests

## 🎭 Weather Condition GIFs

Custom GIF animations for weather conditions:

| Condition | Description | GIF |
|-----------|-------------|-----|
| Clear | Sunny/Clear skies | ☀️ Bright sun animation |
| Heavy Rain | Torrential rain | 🌧️ Heavy downpour |
| Light Rain | Drizzle/light rain | 🌦️ Light sprinkle |
| Thunder | Thunderstorms | ⛈️ Lightning strikes |
| Snow | Snowing | ❄️ Falling snow |
| Mist | Fog/Mist/Haze | 🌫️ Foggy weather |
| Cloudy | Cloudy skies | ☁️ Moving clouds |

GIFs stored in: `src/assets/gifs/`

## 🔧 Configuration Files

### vite.config.js

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:5000'
    }
  }
})
```

### tailwind.config.js

```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Custom theme extensions
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["dark"],
  },
}
```

## 🛠️ Development

### Project Scripts

```json
{
  "dev": "vite",
  "build": "vite build",
  "lint": "eslint .",
  "preview": "vite preview",
  "test": "echo 'No frontend tests configured yet' && exit 0"
}
```

### Code Style

- **Components:** PascalCase (e.g., `WeatherCard.jsx`)
- **Services:** camelCase (e.g., `weatherService.js`)
- **CSS:** Tailwind utility classes preferred
- **Props:** Destructured in component parameters
- **State:** React hooks (useState, useEffect)

### Component Guidelines

**Smart Components (Containers):**
- Handle state management
- Make API calls
- Pass data to presentational components
- Examples: `App.jsx`, `WeatherContainer.jsx`

**Presentational Components:**
- Receive data via props
- Focus on UI rendering
- Minimal business logic
- Examples: `WeatherCard.jsx`, `ForecastCard.jsx`

## 🔍 Debugging

### Development Tools

Enable React DevTools:
```bash
# Install React DevTools browser extension
# Chrome: https://chrome.google.com/webstore
# Firefox: https://addons.mozilla.org/firefox
```

### Console Logging

Enable debug mode:
```javascript
// In App.jsx or main.jsx
if (import.meta.env.DEV) {
  console.log('Development mode enabled');
}
```

### Common Issues

**Vite server won't start:**
- Check if port 5173 is available
- Try different port: `vite --port 3000`
- Clear node_modules: `rm -rf node_modules && npm install`

**Components not updating:**
- Check React Fast Refresh is enabled
- Verify component exports are correct
- Clear browser cache

**API calls failing:**
- Verify backend is running on `http://localhost:5000`
- Check CORS configuration in backend
- Inspect Network tab in DevTools

**Map not displaying:**
- Verify Leaflet CSS is imported
- Check Mapbox token if using Mapbox features
- Ensure map container has defined height/width

## 📊 Performance

### Optimization Techniques

- **Code Splitting:** Dynamic imports for large components
- **Lazy Loading:** React.lazy() for route-based splitting
- **Memoization:** React.memo() for expensive renders
- **Image Optimization:** WebP format with fallbacks
- **Bundle Size:** Tree-shaking with Vite
- **Caching:** Service Worker for offline support

### Build Stats

Production build metrics:
- **Bundle Size:** ~500KB (gzipped)
- **Initial Load:** < 3s on 3G
- **Time to Interactive:** < 5s
- **Lighthouse Score:** 90+ (Performance)

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd frontend
vercel --prod
```

### Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
cd frontend
netlify deploy --prod
```

### Static Hosting

Build and serve from any static hosting:

```bash
npm run build
# Upload dist/ folder to:
# - AWS S3 + CloudFront
# - GitHub Pages
# - Firebase Hosting
# - Cloudflare Pages
```

### Docker Deployment

```bash
# Build and push to registry
docker build -t deepdey01/weather-app-frontend:latest .
docker push deepdey01/weather-app-frontend:latest

# Deploy on any Docker host
docker run -d -p 80:80 deepdey01/weather-app-frontend:latest
```

## 🔐 Environment Variables

| Variable | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `VITE_API_URL` | string | No | `/api` | Backend API base URL |
| `VITE_MAPBOX_TOKEN` | string | No | - | Mapbox API token (optional) |

## 🎨 Theming

### DaisyUI Dark Theme

The app uses DaisyUI's dark theme with custom gradients:

```css
/* Custom gradient backgrounds */
.bg-gradient-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.bg-gradient-secondary {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}
```

### Color Palette

- **Primary:** Purple gradient (#667eea → #764ba2)
- **Secondary:** Pink gradient (#f093fb → #f5576c)
- **Background:** Dark (#1a1a2e)
- **Cards:** Dark slate (#0f3460)
- **Text:** White (#ffffff) / Gray (#94a3b8)

## 📝 License

This project is licensed under the ISC License.

## 👤 Author

**Deep Dey**
- GitHub: [@Deep-Dey1](https://github.com/Deep-Dey1)

## 🙏 Credits

- **Giphy** - Weather condition GIF animations
- **OpenWeatherMap** - Weather data API
- **Leaflet** - Open-source mapping library
- **Mapbox** - Map tiles and geocoding
- **DaisyUI** - Beautiful UI components

---

**Last Updated:** November 2025
