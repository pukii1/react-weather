import React from 'react'
import "../styles/Dropdown.scss"
import { useEffect } from 'react'
export default function Dropdown({setCoords, suggestions}) {
  
  useEffect(()=>{
    console.log(setCoords)
  }, [])
  const handleLocationClick = (city, country_code, lat, lon)=>{
    console.log("clicked " + city);
    setCoords(city, country_code, lat, lon)
  }
  return (
    <div className="dropdown">
        <div className="dropdown-content">

            {suggestions.map((suggestion, i)=>{
                return (
                <button 
                className="location-link" 
                onClick={()=>{handleLocationClick(suggestion.city, suggestion.country_code, suggestion.lat, suggestion.lon)}} 
                key={i}>
                  {suggestion.city}, {(suggestion.country_code).toUpperCase()}
              </button>
              )
            })}
        </div>
    </div>
  )
}
