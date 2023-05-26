import React from 'react'
import "../styles/Dropdown.scss"

export default function Dropdown({suggestions}) {
  return (
    <div className="dropdown">
        <div className="dropdown-content">

            {suggestions.map((suggestion, i)=>{
                return (<a href="#" key={i}>
                    {suggestion.city},
                    {suggestion.country},
                    {suggestion.country_code}
                </a>)
            })}
        </div>
    </div>
  )
}
