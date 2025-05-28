const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const fetchWeatherByCity =async (city)=>{
  const response = await fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}`);
  if (!response.ok) {
    const { message } = await response.json();
    throw new Error(message || 'API Error');
  }
  return await response.json();
}