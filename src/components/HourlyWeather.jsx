import React from 'react'
import "../styles/HourlyWeather.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import HourlyDetails from './HourlyDetails';

export default function HourlyWeather({hourlyWeatherData}) {

 
  return (
    <div className="hourlyWeather">
        <div className="navigation">
            <span className="today">Today</span>
            <button className="fiveDays">
                5 days  
                <FontAwesomeIcon className="navIcon" icon={faChevronRight}/>
            </button>
        </div>

        <div className="hourlyForecasts">
            {hourlyWeatherData.map((forecast) => {
                return <HourlyDetails forecastData={forecast}/>
            })}
        </div>
        
    </div>
  )
}
