import React from 'react'
import WeatherDetails from './WeatherDetails';
import "../styles/ForecastTomorrow.scss"
import { getWeatherImagePath } from '../helpers';

export default function ForecastTomorrow({weatherData}) {
    const mainWeatherData = weatherData[0];
    console.log(weatherData)
    const weatherCondition = mainWeatherData.weather[0].description
    const weatherIcon = getWeatherImagePath(weatherCondition)

  return (
    <div className="forecastTomorrow">
        <div className="mainWeather">
            <div >
                <img className="weatherIcon" src={weatherIcon} alt={weatherCondition} />
            </div>
            <div className="mainInfo">
                <p>Tomorrow</p>
                <div className="temp">
                    <p>max temp</p>/ <p>min temp °</p>
                </div>
                <p>description</p>
            </div>
        </div>
        <WeatherDetails weatherData={mainWeatherData}/>
      </div>
  )
}
