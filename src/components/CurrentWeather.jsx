import React, { useEffect } from 'react'
import { toCelsius} from '../helpers.js';
import CurrentDate from './CurrentDate.jsx';
import _ from 'lodash';

import "../styles/CurrentWeather.css"
import WeatherDetails from './WeatherDetails.jsx';
import { getWeatherImagePath } from '../helpers.js';
export default function CurrentWeather({weatherData}) {
  
  
  const weatherCondition = weatherData.weather[0].description
  const weatherIcon = getWeatherImagePath(weatherCondition)

//src\assets\cloud
  useEffect(()=>{
    console.log(weatherData)
  }, [])
  return (
    <div className="currentWeather">

        <div >
        <img className="weatherIcon" src={weatherIcon} alt={weatherCondition} />
        </div>
        
        <div className="mainWeather">
            <p className="temp">{toCelsius(weatherData.main.temp)}°</p>
            <p className="weatherDescr">{weatherData.weather[0].main}</p>
            <CurrentDate className="date"/>
        </div>
        <WeatherDetails weatherData={weatherData}/>
        
    </div>
  )
}
