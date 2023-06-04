import React from 'react'
import WeatherDetails from './WeatherDetails';
import "../styles/ForecastTomorrow.scss"
import { getWeatherImagePath } from '../helpers';
import {minTemp, maxTemp, toCelsius} from "../helpers.js"

export default function ForecastTomorrow({weatherData}) {
    const mainWeatherData = weatherData[0];
    console.log(weatherData)
    const minTemperature = toCelsius(minTemp(weatherData))
    const maxTemperature = toCelsius(maxTemp(weatherData))
    const weatherCondition = mainWeatherData.weather[0].description
    const weatherIcon = getWeatherImagePath(weatherCondition)

  return (
    <div className="forecastTomorrow">
        <div className="mainWeatherTomorrow">
            <div className="weatherIconContainer">
                <img className="weatherIconTomorrow" src={weatherIcon} alt={weatherCondition} />
            </div>
            <div className="mainInfo">
                <p className="mainTomorrowTitle">Tomorrow</p>
                <div className="temp">
                    <span className="maxTemp">{maxTemperature}</span><span className="minTemp">/{minTemperature}°</span>
                </div>
                <p className="weatherDescription">{weatherCondition}</p>
            </div>
        </div>
        <WeatherDetails weatherData={mainWeatherData}/>
      </div>
  )
}
