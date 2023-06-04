import React from 'react'
import clear from "../assets/sun/clear.png"
import "../styles/HourlyDetails.scss"
import { epochToGMT } from '../helpers'


export default function HourlyDetails({forecastData}) {
  /**
 * Helper function to convert kelvin to celsius
 * @param {} k temp in kelvin
 * @returns temp in celsius
 */
  //converts kelvin to celsius
  const toCelsius = (k)=>{
    return Math.floor(k-273.15)
  }
  return (
    <div className="hourlyDetails">
        <p className="hourlyTemp">{toCelsius(forecastData.main.temp)}°</p>
        <img src={clear} className="hourlyIcon" alt="sunny" />
        <p className="hourlyTime">{epochToGMT(forecastData.dt)}</p>
    </div>
  )
}
