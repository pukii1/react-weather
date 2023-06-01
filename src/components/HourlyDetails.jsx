import React from 'react'
import clear from "../assets/sun/clear.png"
import "../styles/HourlyDetails.scss"

export default function HourlyDetails({forecastData}) {
    /**
     * Helper function to convert unix epoch timestamp to regular time
     * @param {*} timestamp unix epoch timestamp
     * @returns the hour of the timestamp (i.e. 15:00)
     */
    const epochToGMT =(timestamp)=>{
        let date = new Date(timestamp * 1000)
        let year = date.getFullYear();
        let month = date.getMonth() + 1; 
        let day = date.getDate();
        let hour = date.getHours(); 
        //console.log(`${day}.${month}.${year}, ${hour}:00`)
        return `${hour}:00`;
    }

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
