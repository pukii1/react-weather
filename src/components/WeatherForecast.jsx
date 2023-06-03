import React from 'react'

export default function WeatherForecast({returnToCurrentWeather}) {
  return (
    <div>
        <button onClick={returnToCurrentWeather}>Return to current weather</button>
      Weather Forecast
    </div>
  )
}
