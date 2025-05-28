import React,{createContext,useState,useEffect} from 'react'

import { fetchWeatherByCity } from '../utils/api';

export const WeatherContext =createContext();

export const WeatherProvider =({children })=>{
  const [city,setCity] = useState(() => localStorage.getItem('lastCity') || 'Mumbai');
  const [weatherData,setWeatherData] = useState(null);
  const [error,setError] = useState(null);
  const [loading,setLoading] = useState(false);

  const fetchWeather = async(cityName)=>{
    setLoading(true);
    setError('');
    try{
      const data =await fetchWeatherByCity(cityName);
      setWeatherData(data);
      setCity(cityName);
      localStorage.setItem('lastCity',cityName);
      setError(null); 
    }catch(err){
      setError(err.message);
    }finally{
      setLoading(false);
    }
  }

  useEffect(()=>{
     const lastCity = localStorage.getItem('lastCity');
    fetchWeather(lastCity||city);
  },[])

  useEffect(()=>{
    const interval = setInterval(()=>{
      fetchWeather(city);
    },30000)
    return ()=>clearInterval(interval);
  },[city])

  return(
    <WeatherContext.Provider value={{city, weatherData, loading, error, fetchWeather}}>
      {children}
    </WeatherContext.Provider>
  )
}

