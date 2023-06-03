import React from 'react'
import CurrentWeather from './components/CurrentWeather';
import HourlyWeather from './components/HourlyWeather';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './App.css';

export default function CurrentWeatherDisplay() {
  const  {currentWeatherData} = useContext(WeatherDataContext)
  const {hourlyWeatherData} = useContext(WeatherDataContext)
    return (
    <div>
      <div>
            <p className="debug">Hamburg</p>
          {weatherData && <CurrentWeather weatherData={currentWeatherData[0]}/>}
      </div>
      <div className="navigation">
            <span className="today">Today</span>
            <button className="fiveDays">
                5 days  
                <FontAwesomeIcon className="navIcon" icon={faChevronRight}/>
            </button>
        </div>
          {weatherData && <HourlyWeather hourlyWeatherData={hourlyWeatherData}/>}
    </div>
  )
}
