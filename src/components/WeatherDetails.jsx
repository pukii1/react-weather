import React from 'react'
import "../styles/WeatherDetails.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWind } from '@fortawesome/free-solid-svg-icons';
import {faDroplet} from '@fortawesome/free-solid-svg-icons';
import {faCloudRain} from '@fortawesome/free-solid-svg-icons';
import { minTemp, toCelsius, toMpH } from '../helpers';

export default function WeatherDetails({weatherData}) {
  return (
    <div className="detailedWeather">
          
          <div className="probPrecipitation">
            <FontAwesomeIcon icon={faCloudRain}/>
            <p>{weatherData.pop}%</p>
            <p className="detailedDescr">Chance of Rain</p>
          </div>
          <div className="wind">
            <FontAwesomeIcon icon={faWind}/>
            <p>{toMpH(weatherData.wind.speed)}mp/h</p>
            <p className="detailedDescr">Wind</p>
          </div>
          <div className="humidity">
            <FontAwesomeIcon icon={faDroplet}/>
            <p>{weatherData.main.humidity}%</p>
            <p className="detailedDescr">Humidity</p>
          </div>


        </div>
  )
}
