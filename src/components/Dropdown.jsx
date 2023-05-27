import React from 'react'
import "../styles/Dropdown.scss"

export default function Dropdown({suggestions, setCoords}) {
  
  return (
    <div className="dropdown">
        <div className="dropdown-content">

            {suggestions.map((suggestion, i)=>{
                return (<a href="#" onClick={()=>{setCoords(suggestion.lat, suggestion.lon)}} key={i}>
                    {suggestion.city},
                    {suggestion.country},
                    {suggestion.country_code}
                </a>)
            })}
        </div>
    </div>
  )
}
