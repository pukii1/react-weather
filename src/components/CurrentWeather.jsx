import React, { useEffect } from 'react'
import CurrentDate from './CurrentDate.jsx';
export default function CurrentWeather({weatherData}) {
  
/**
 * Helper function to convert kelvin to celsius
 * @param {} k temp in kelvin
 * @returns temp in celsius
 */
  //converts kelvin to celsius
  const toCelsius = (k)=>{
    return Math.floor(k-273.15)
  }

  useEffect(()=>{
    console.log(weatherData)
  }, [])
  return (
    <div>
        <div className="weatherIcon">Icon</div>
        <div className="mainWeather">
            <p>{toCelsius(weatherData.main.temp)}°</p>
            <p>{weatherData.weather[0].main}</p>
            <CurrentDate/>
        </div>
        <div className="detailedWeather">
            <p className="humidity">{weatherData.weather[0].main.temp}</p>
        </div>
    </div>
  )
}
