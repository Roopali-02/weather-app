import React,{useState, useContext,useEffect } from 'react'
import { WeatherContext } from '../context/WeatherContext';
import styles from '../styles/WeatherDisplay.module.css';
import { FaWind, FaTint, FaCompressArrowsAlt,FaWater, FaMountain , FaEye,FaTemperatureHigh,FaTemperatureLow ,} from "react-icons/fa";
import ErrorMessage from './ErrorMessage';
const WeatherDisplay = () => {
	const {weatherData, loading,error} = useContext(WeatherContext);
	const [showError, setShowError] = useState(false);

		 useEffect(() => {
			if (error) {
				setShowError(true);
				const timer = setTimeout(() => setShowError(false), 5000);
				return () => clearTimeout(timer);
			}
		}, [error]);
		

		 if (!weatherData?.main) {
			return (
				<div className={styles.mainContainer}>
					<p>No data available</p>
				</div>
			);
		}
		const {
			name,
			dt,
			 main: { temp,feels_like,humidity,pressure,sea_level,temp_max,temp_min,grnd_level},
			 wind: { speed },
			 sys:{country,sunrise, sunset},
			 weather,
			 visibility
			 } = weatherData;

	const windSpeedKmh = (speed * 3.6).toFixed(1); 
	const visibilityKm = (visibility / 1000).toFixed(1);
	const kelvinToCelcius =(KelvinVal)=> {return Math.round(KelvinVal - 273.15)}

	const stats = [
		{ icon: <FaWater  />, label: "Sea Level", value: `${sea_level} hPa` },
		{ icon: <FaTint />, label: "Humidity", value:`${humidity}%` },
		{ icon: <FaCompressArrowsAlt />, label: "Pressure", value: `${pressure} mb` },
		{ icon: <FaTemperatureHigh  />, label: "Max Temperature", value: `${kelvinToCelcius(temp_max)} °C`},
		{ icon: <FaWind />, label: "Wind", value: `${windSpeedKmh} km/h` },
		{ icon: <FaEye />, label: "Visibility", value: `${visibilityKm} km` },
		{ icon: <FaMountain />, label: "Ground Level", value: `${grnd_level} hPa` },
		{ icon: <FaTemperatureLow />, label: "Min Temperature", value: `${kelvinToCelcius(temp_min)} °C` }
	];

	const updatedTime = new Date(dt * 1000).toLocaleTimeString('en-IN', {
		hour: '2-digit',
		minute: '2-digit',
		hour12: false,
		timeZone: 'Asia/Kolkata'
	});

	const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

	const formatTime = (timestamp) => {
		const date = new Date(timestamp * 1000);
		return date.toLocaleTimeString('en-IN', {
			hour: '2-digit',
			minute: '2-digit',
		});
	};
	const showFallback = !weatherData?.main;


	return (
	 <div className={styles.mainContainer}>
		{showError && (
					<div className={styles.errorBanner}>
						<ErrorMessage message={error} />
					</div>
		)}

		{showFallback ? (
				<div className={styles.noData}>No weather data available.</div>
			) : (
				<>
					{loading && <div className={styles.loaderOverlay}>Refreshing...</div>}
					<div className={styles.weatherCard}>
						<div><span>{`${name}, ${country}`}</span><p>{`As of ${updatedTime} IST`}</p></div>
						<div>
						 <span className={styles.temp}>{kelvinToCelcius(temp)}°C</span> <img src={iconUrl} alt={weather[0].description} />
							<div className={styles.tempDescription}>{weather[0].main}</div>
							<div className={styles.sunInfo}><span>Sunrise :<span className={styles.sunTime}>{formatTime(sunrise)}</span> </span>|<span>Sunset :<span className={styles.sunTime}>{formatTime(sunset)}</span> </span></div>
						</div>
					</div>
					<div className={styles.detailedWeatherCard}>
						<div className={styles.heading}>{`Weather Today in ${name}, ${country}`}</div>
						<div className={styles.feelsContainer}><span>Feels Like </span><span className={styles.feelsLike}>{kelvinToCelcius(feels_like)}°C</span>
						</div>
				
					<div className={styles.statsGridWrapper}>
					<div className={styles.columnLeft}>
						{stats.slice(0, 4).map(({ icon, label, value }) => (
							<div className={styles.statRow} key={label}>
								<div className={styles.statLeft}>
									<span>{icon}</span>
									<span>{label}</span>
								</div>
								<span className={styles.statValue}>{value}</span>
							</div>
						))}
					</div>
						<div className={styles.columnRight}>
							{stats.slice(4).map(({ icon, label, value }) => (
								<div className={styles.statRow} key={label}>
									<div className={styles.statLeft}>
										<span>{icon}</span>
										<span>{label}</span>
									</div>
									<span className={styles.statValue}>{value}</span>
								</div>
							))}
						</div>
					</div>
					</div>
							</>
						)}
	 </div>
	)
}

export default WeatherDisplay