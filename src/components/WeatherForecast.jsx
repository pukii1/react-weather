import React from 'react'
import "../styles/WeatherForecast.scss"
import { useEffect } from 'react';
import { faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import { faCalendarAlt} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ForecastTomorrow from './ForecastTomorrow';
import ForecastPreview from './ForecastPreview';

export default function WeatherForecast({returnToCurrentWeather, weatherData}) {
  /**
   * Callback to filter weather data array and remove entries dated "today"
   * @param {*} fc forecast weather entry
   * @returns true if fc isnt today, false if fc is today 
   */
  const compDates = (fc) => {
    const todaysDate = new Date();
    todaysDate.setHours(0, 0, 0, 0);
  
    const currentDate = new Date(fc.dt * 1000);
    currentDate.setHours(0, 0, 0, 0);
  
    return currentDate > todaysDate;
  };

  // day forecast weather data
  const fourDayForecast = weatherData.filter(compDates);
  //group forecast data by date to calculate min/max temp etc
  const groupedData = fourDayForecast.reduce((result, element) => {
    const date = new Date(element.dt * 1000).setHours(0, 0, 0, 0);
    
    if (!result[date]) {
      result[date] = [];
    }
    
    result[date].push(element);
    
    return result;
  }, {});

  //tomorrows weather data
  const tomorrowsWeatherData = groupedData[Object.keys(groupedData)[0]]
  const forecastDataKeys = Object.keys(groupedData);
  const lastFourDayKeys = forecastDataKeys.slice(-4);

    


    //debug
    useEffect(()=>{
      console.log(lastFourDayKeys)
    }, [])
  return (
    <>
    <div className="weatherForecast">
        <div className="forecastNavigation">
          <button onClick={returnToCurrentWeather}>
            <FontAwesomeIcon icon={faChevronLeft}/>
          </button>
          <p className="forecastTomorrowTitle">
            <FontAwesomeIcon className="forecastCalendarIcon" icon={faCalendarAlt}/>
            5 days
          </p>
        </div>
      <ForecastTomorrow weatherData={tomorrowsWeatherData}/>
    </div>

    <div className="forecastPreviewContainer">
      {lastFourDayKeys.map((dayKey)=>{
          return <ForecastPreview weatherData={groupedData[dayKey]}/>
      })}
    </div>
    
      </>
  )
}
