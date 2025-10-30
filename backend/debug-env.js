require('dotenv').config();

console.log('=== Environment Debug ===');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('PORT:', process.env.PORT);
console.log('API Key exists:', !!process.env.OPENWEATHER_API_KEY);
console.log('API Key length:', process.env.OPENWEATHER_API_KEY ? process.env.OPENWEATHER_API_KEY.length : 0);
console.log('API Key value:', process.env.OPENWEATHER_API_KEY);
console.log('API Key (first 10 chars):', process.env.OPENWEATHER_API_KEY ? process.env.OPENWEATHER_API_KEY.substring(0, 10) : 'undefined');
console.log('======================');

// Test the actual API call
const axios = require('axios');

async function testAPI() {
  try {
    const API_KEY = process.env.OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${API_KEY}&units=metric`;
    
    console.log('\nTesting OpenWeatherMap API...');
    console.log('URL (without key):', url.replace(API_KEY, 'HIDDEN'));
    
    const response = await axios.get(url);
    console.log('✅ SUCCESS! API key is working!');
    console.log('Weather in London:', response.data.main.temp + '°C');
  } catch (error) {
    console.log('❌ ERROR:', error.response ? error.response.data : error.message);
    console.log('Status Code:', error.response ? error.response.status : 'N/A');
  }
}

testAPI();
