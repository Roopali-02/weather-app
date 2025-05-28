import React from 'react'
import styles from '../styles/WeatherDisplay.module.css';
const ErrorMessage = ({message}) => {
  if (!message) return null;

  return (
    <div className={styles.errorBox}>
     <strong>Error:</strong> {message}
  </div>
  )
}

export default ErrorMessage