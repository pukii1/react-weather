import React from 'react'
import "../styles/ForecastPreview.scss"
import { getDayFromEpoch, getWeatherImagePath } from '../helpers'
import { toCelsius, minTemp, maxTemp } from '../helpers'
export default function ForecastPreview({weatherData}) {

    const weekday = getDayFromEpoch(weatherData[0].dt)
    const weatherCondition = weatherData[0].weather[0].description
    const weatherIcon = getWeatherImagePath(weatherCondition)
  return (
    <div className="forecastPreview">
      <p className="forecastDay">{weekday}</p>
      
      <div className="forecastDescr">
        <div >
            <img className="forecastPreviewWeatherIcon" src={weatherIcon} alt={weatherCondition} />
        </div>
        <p>{weatherCondition}</p>
        </div>
      <div className="forecastTemp">
        <p className="forecastMaxTemp">{toCelsius(maxTemp(weatherData))}°</p>/
        <p className="forecastMinTemp">{toCelsius(minTemp(weatherData))}°</p>
      </div>
    </div>
  )
}
