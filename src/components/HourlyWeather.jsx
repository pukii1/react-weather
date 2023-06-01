import React from 'react'
import "../styles/HourlyWeather.scss"
import HourlyDetails from './HourlyDetails';

export default function HourlyWeather({hourlyWeatherData}) {

 
  return (
    <div className="hourlyWeather">
        

        <div className="hourlyForecasts">
            {hourlyWeatherData.map((forecast) => {
                return <HourlyDetails forecastData={forecast}/>
            })}
        </div>
        
    </div>
  )
}
