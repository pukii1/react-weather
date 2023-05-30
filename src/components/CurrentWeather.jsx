import React, { useEffect } from 'react'
import CurrentDate from './CurrentDate.jsx';
import _ from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWind } from '@fortawesome/free-solid-svg-icons';
import {faDroplet} from '@fortawesome/free-solid-svg-icons';
import {faCloudRain} from '@fortawesome/free-solid-svg-icons';

//weather images
import clouds from '../assets/cloud/clouds.png'
import thunderstorm from "../assets/cloud/thunderstorm.png"
import rain from "../assets/cloud/rain.png"
import moderate_rain from "../assets/sun/moderate_rain.png"
import heavy_snow from  "../assets/cloud/heavy_snow.png"
import snow from "../assets/cloud/snow.png"
import freezing_rain from "../assets/cloud/freezing_rain.png"
import clear from "../assets/sun/clear.png"
import few_clouds from "../assets/sun/few_clouds.png"
import "../styles/CurrentWeather.css"

export default function CurrentWeather({weatherData}) {
  
  const getWeatherImagePath = (weatherCondition) => {
    switch(weatherCondition){
      //thunderstorms
      case "thunderstorm" : 
      case "thunderstorm with light rain" :
      case "thunderstorm with heavy rain":
      case "light thunderstorm":
      case "heavy thunderstorm":
      case "ragged thunderstorm":
      case "thunderstorm with light drizzle":
      case "thunderstorm with drizzle":
      case "thunderstorm with heavy drizzle":
        return thunderstorm;
      //drizzle
      case "light intensity drizzle": 
      case "drizzle":
      case "heavy intensity drizzle":
      case "light intensity drizzle rain":
      case "drizzle rain":
      case "heavy intensity drizzle rain":
      case "shower rain and drizzle":
      case "heavy shower rain and drizzle":
      case "shower drizzle":
        return rain
      //rain
      case "light rain":
      case "moderate rain":
      case "heavy intensity rain":
      case "very heavy rain":
      case "extreme rain":
        return moderate_rain
      case "freezing rain":
        return freezing_rain
      case "light intensity shower rain":
      case "shower rain":
      case "heavy intensity shower rain":
      case "ragged shower rain":
        return rain
      //snow
      case "light snow":
      case "snow":
        return snow
      case "heavy snow":
        return heavy_snow
      case "sleet":
      case "light shower sleet":
      case "shower sleet":
      case "light rain and snow":
      case "rain and snow":
      case "light shower snow":
      case "shower snow":
      case "heavy shower snow":
        return freezing_rain
      //clear
      case "clear sky":
        return clear
      //clouds
      case "few clouds":
        return few_clouds
      case "scattered clouds":
      case "broken clouds": 
      case "overcast clouds":
        return clouds
        default:
          return thunderstorm
    }
  }
  const weatherCondition = weatherData.weather[0].description
  const weatherIcon = getWeatherImagePath(weatherCondition)
/**
 * Helper function to convert kelvin to celsius
 * @param {} k temp in kelvin
 * @returns temp in celsius
 */
  //converts kelvin to celsius
  const toCelsius = (k)=>{
    return Math.floor(k-273.15)
  }
  const toMpH = (speed) =>{
    return Math.floor(speed * 2.237)
  }
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
    </div>
  )
}
