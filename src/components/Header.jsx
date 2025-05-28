import React from 'react'
import styles from '../styles/WeatherDisplay.module.css';
import SearchInput from './SearchInput';
import {FaUser  } from "react-icons/fa";
const Header = () => {
  return (
     <div className={styles.header}>
      <div className={styles.appName}>WeatherToday</div>
      <SearchInput/>
      <div className={styles.userLogo}><FaUser /></div>
     </div>
  )
}

export default Header