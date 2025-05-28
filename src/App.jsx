import React, {  } from 'react'
import './App.css'
import { WeatherProvider } from './context/WeatherContext';
import WeatherDisplay from './components/WeatherDisplay';
import Header from './components/Header';

function App() {
  
  return (
    <WeatherProvider>
      <Header/>
      <WeatherDisplay/>
    </WeatherProvider>
  )
}

export default App
