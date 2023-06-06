//weather images
import clouds from './assets/cloud/clouds.png'
import thunderstorm from "./assets/cloud/thunderstorm.png"
import rain from "./assets/cloud/rain.png"
import moderate_rain from "./assets/sun/moderate_rain.png"
import heavy_snow from  "./assets/cloud/heavy_snow.png"
import snow from "./assets/cloud/snow.png"
import freezing_rain from "./assets/cloud/freezing_rain.png"
import clear from "./assets/sun/clear.png"
import few_clouds from "./assets/sun/few_clouds.png"



/**
* Helper function to convert unix epoch timestamp to regular time
* @param {*} timestamp unix epoch timestamp
* @returns the hour of the timestamp (i.e. 15:00)
*/
export function epochToGMT(timestamp){
 let date = new Date(timestamp * 1000)
 let year = date.getFullYear();
 let month = date.getMonth() + 1; 
 let day = date.getDate();
 let hour = date.getHours(); 
 //console.log(`${day}.${month}.${year}, ${hour}:00`)
 return `${hour}:00`;
}


/**
 * Helper to get the min temp of a forecast weather obj
 * @param {} fc forecast obj
 * @returns min temperature
 */
export function minTemp(weatherData){
    let minT = weatherData.reduce((min, obj)=>{
        return obj.main.temp_min < min ? obj.main.temp_min : min;
    }, Infinity)

    return minT;
}

/**
 * Helper to get the max temp of a forecast weather obj
 * @param {} fc forecast obj
 * @returns max temperature
 */
export function maxTemp(weatherData){
  let maxT = weatherData.reduce((max, obj)=>{
      return obj.main.temp_max > max ? obj.main.temp_max : max;
  }, -Infinity)

  return maxT;
}
/**
 * Helper function to convert kelvin to celsius
 * @param {} k temp in kelvin
 * @returns temp in celsius
 */
  export function toCelsius(k){
    return Math.floor(k-273.15)
  }
/**
 * Helper function to convert m/s to mp/H
 * @param {} speed velocity in m/s
 * @returns velocity in mp/h
 */
  export function toMpH(speed){
    return Math.floor(speed * 2.237)
  }

  const weekdays = {
    1: ["Monday", "Mon"],
    2: ["Tuesday", "Tue"],
    3: ["Wednesday", "Wed"],
    4: ["Thursday", "Thur"],
    5: ["Friday", "Fri"],
    6: ["Saturday", "Sat"],
    7: ["Sunday", "Sun"]
  }

  /**
   * Helper function to get weekday from epoch timestamp
   * @param {*} timestamp epoch timestamp
   * @returns weekday
   */
  export function getDayFromEpoch(timestamp){
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    return weekdays[day+1][1];
  }
  /**
   * Helper to get weather icon corresponding to @weatherConidition
   * @param {*} weatherCondition the weather condition i.e. rainy
   * @returns weather icon corresponding to @weatherCondition
   */
  export function getWeatherImagePath(weatherCondition){
    switch(weatherCondition){
      //thunderstorms
      case "thunderstorm" : 
      case "thunderstorm with light rain" :
      case "thunderstorm with heavy rain":
      case "light thunderstorm":
      case "heavy thunderstorm":
      case "ragged thunderstorm":
      case "thunderstorm with light drizzle":
      case "thunderstorm with drizzle":
      case "thunderstorm with heavy drizzle":
        return thunderstorm;
      //drizzle
      case "light intensity drizzle": 
      case "drizzle":
      case "heavy intensity drizzle":
      case "light intensity drizzle rain":
      case "drizzle rain":
      case "heavy intensity drizzle rain":
      case "shower rain and drizzle":
      case "heavy shower rain and drizzle":
      case "shower drizzle":
        return rain
      //rain
      case "light rain":
      case "moderate rain":
      case "heavy intensity rain":
      case "very heavy rain":
      case "extreme rain":
        return moderate_rain
      case "freezing rain":
        return freezing_rain
      case "light intensity shower rain":
      case "shower rain":
      case "heavy intensity shower rain":
      case "ragged shower rain":
        return rain
      //snow
      case "light snow":
      case "snow":
        return snow
      case "heavy snow":
        return heavy_snow
      case "sleet":
      case "light shower sleet":
      case "shower sleet":
      case "light rain and snow":
      case "rain and snow":
      case "light shower snow":
      case "shower snow":
      case "heavy shower snow":
        return freezing_rain
      //clear
      case "clear sky":
        return clear
      //clouds
      case "few clouds":
        return few_clouds
      case "scattered clouds":
      case "broken clouds": 
      case "overcast clouds":
        return clouds
        default:
          return thunderstorm
    }
  }