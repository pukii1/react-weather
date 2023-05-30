import React from 'react'

export default function Currentdate({className}) {
//get weekday + date w/o yr from @newDate obj
const newDate = new Date()
const date = newDate.getDate();
const month = newDate.getMonth() + 1;
const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
const months = ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

  return (
    <div className={className}>
      <p>{weekdays[newDate.getDay()]}, {date} {months[month]}</p>
    </div>
  )
}
