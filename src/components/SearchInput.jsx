import React,{useState,useContext } from 'react'
import styles from '../styles/WeatherDisplay.module.css'
import {WeatherContext } from '../context/WeatherContext';

const SearchInput = () => {
	const [input,setInput] = useState('')
	const {fetchWeather} = useContext(WeatherContext);

	const handleSearch = ()=>{
		if(input.trim()!==''){
			fetchWeather(input);
			setInput('');
		}
	}
	const handleKeyDown=(e)=>{
		if(e.key==='Enter'){
				handleSearch();
		}
	}
	return (
		<div className={styles.searchWrapper}>
			<input
				type="text"
				className={styles.searchInput}
				value={input}
				placeholder="Search city..."
				onChange={(e)=>setInput(e.target.value)}
				onKeyDown={handleKeyDown}
			/>
			<button className={styles.searchBtn} onClick={handleSearch}>Search</button>
		</div>
	)
}

export default SearchInput