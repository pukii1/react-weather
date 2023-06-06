import './App.scss';
import Dropdown from './components/Dropdown';
import CurrentWeather from './components/CurrentWeather';
import WeatherForecast from './components/WeatherForecast';
import { useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';
import HourlyWeather from './components/HourlyWeather';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'


function App() {
  //lodash delay time in ms
  const delayTime = 3000;
  //flag denoting if a location has been selected from the dropdown suggestions
  const [selectedLocation, setSelectedLocation] = useState(false);
  //Autocomplete fetch URL
  const [autoUrl, setAutoUrl] = useState("");
  //Autocomplete API Key
  const autoAPIKey = process.env.REACT_APP_AUTOCOMPLETE_TOKEN;
  //weather API key
  const weatherAPIKey = process.env.REACT_APP_WEATHER_TOKEN;//"020fdb36b8b179cde66157d24221cac6";
  //reverse geocoding key to convert coords to location
  const reverseGeoKey = "85d1e69a6f9b4e08b4226c0465384f18"

  const [defaultCity, setDefaultCity] = useState("");
  const [defaultCountryCode, setDefaultCountryCode] = useState("");
  const [defaultLat, setDefaultLat] = useState("");
  const [defaultLon, setDefaultLon] = useState("");
  //default weather fetch url
  const defaultWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${defaultLat}&lon=${defaultLon}&appid=${weatherAPIKey}`
  const [reverseGeocodeUrl, setReverseGeocodeUrl] = useState("");
  //weather url
  const [weatherUrl, setWeatherUrl] = useState("");
  //search value
  const [location, setLocation] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  //weather data + weather fetch error
  const [weatherError, setWeatherError] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [hourlyWeatherData, setHourlyWeatherData] = useState(null)
  //autocomplete suggestions
  const [suggestions, setSuggestions] = useState([]);
  const [showForecast, setShowForecast] = useState(false);
  const [hideDropDown, setHideDropDown] = useState(true);
  /**
   * callback to poplate weather data + weather error consts
   * @param {*} data data received from the weather fetch 
   * @param {*} error potential error received from the weather fetch
   */
  const fetchWeatherCallback = (data, error)=>{
    setWeatherData(data);
    //get hourly weather forecast data (4x 3h forecasts)
    console.log(data)
    if(data){
      let hourlyWeatherData = data.slice(0,4);
      setHourlyWeatherData(hourlyWeatherData)
    }
    
    setWeatherError(error)
  }
  /**
   * autocomplete fetch callback used to populate 
   * the location suggestions, autocompleteError + loading state
   * @param {*} data location suggestions received from the autocomplete fetch
   * @param {*} error potential error
   * @param {*} loading loading state
   */
  const weatherFetchCallback = (data, error, loading)=> {
    setSuggestions(data);
    setHideDropDown(false)
    setError(error);
    setLoading(loading);
  }
  
  /**
   * UseEffect to trigger weather data fetch once coords change
   */
  useEffect(()=>{
    console.log(`fetching ${weatherUrl}`)
    fetchWeather(weatherUrl);
  }, [weatherUrl])


  /**
   * UseEffect to trigger autocomplete fetch
   *  after @delayTime ms once @location changes via debounce
   */
   useEffect(() => {
    console.log("location changed....")
    if(location.length > 0){
      const debouncedFetch = debounce(() => {
        setLoading(true);
        setAutoUrl(`https://api.geoapify.com/v1/geocode/autocomplete?text=${location}&type=city&format=json&apiKey=${autoAPIKey}`);
      }, delayTime);
    
      debouncedFetch();
    
      return () => {
        // Cancel the debounced function if the component unmounts
        // or the value changes before the debounce time
        debouncedFetch.cancel(); 
      };
    }
  }, [location]);


  /**
   * Debug set fetch to default city
   */
  useEffect(()=>{
    getDefaultLocation();
  }, [])
  /**
   * Fetches locations when location is updated
   */
  useEffect(()=>{
      fetchLocations(autoUrl, weatherFetchCallback);
  }, [autoUrl])

  /**
   * Helper function passed to Dropdown child comp
   * inserts the coords of the selected location into
   * the url for the weather api call
   * passes city name + country code to update location display in the input field
   * @param {} city city name of the selected location
   * @param {*} country_code country code of the selected location
   * @param {*} lat latitude of the selected location
   * @param {*} lon longitude of the selected location
   */
  const setCoords = useCallback((city, country_code, lat, lon) => {
    // update input value to display selected location
    setLocation(`${city}, ${country_code}`);
    setSelectedLocation(true);
    setHideDropDown(true);

    // put location's coords into weather fetch URL
    setWeatherUrl(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${weatherAPIKey}`);
    console.log(`setting coords lat:${lat}, lon:${lon}`);
  }, [setLocation, setSelectedLocation, setWeatherUrl, weatherAPIKey]);
  

  //TODO fix location useEffect call + loading state on default location fetch
  const fetchWeather = (weatherUrl)=>{
    fetch(weatherUrl)
    .then(res => {
      // If data fetching failed, throw an error with an error message
      if (!res.ok) {
        throw new Error("Error occurred while trying to fetch the weather data");
      }
      // If fetching succeeded, return the JSON of the response
      return res.json();
    })
    .then(data => {
      //console.log("fetching weather data")
      //console.log(data)
      fetchWeatherCallback(data.list, null);
    })
    .catch(err => {
      fetchWeatherCallback( null, err.message);
    });
  
  }
  
  const getDefaultLocation = ()=>{
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              let lat = position.coords.latitude;
              let lon = position.coords.longitude;
              setDefaultLat(lat)
              setDefaultLon(lon)
              setReverseGeocodeUrl(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&format=json&apiKey=${reverseGeoKey}`)
            },
            (error) => {
              //TODO display default location msg
            }
          );
        } else {
          setCoords("Hamburg", "de", defaultLat, defaultLon)
        }
    };
  
    useEffect(()=>{
      fetch(reverseGeocodeUrl)
      .then((res)=>{
        // If data fetching failed, throw an error with an error message
        if (!res.ok) {
          throw new Error("Error occurred while trying to fetch the data");
        }
        // If fetching succeeded, return the JSON of the response
        return res.json();
      })
      .then((data)=>{
        console.log("reverse geocoding fetch")
        console.log(data)
        setDefaultCity(data.results[0].city);
        setDefaultCountryCode(data.results[0].country_code)
      })

    }, [reverseGeocodeUrl])


    useEffect(()=>{
      console.log("set coords in App.js")
      console.log(setCoords)
    }, [])
    //set coords if default city and country code change
    useEffect(()=>{
      console.log(`city: ${defaultCity}, country_code: ${defaultCountryCode}`)
      setCoords(defaultCity, defaultCountryCode, defaultLat, defaultLon);
      setLoading(false);
    }, [defaultCity, defaultCountryCode])
  /**
   * Fetch function to fetch autocomplete suggestions
   * @param {} url autocomplete fetch url
   * @param {*} callback callback to populate data, error, loading consts w fetched data
   */
  const fetchLocations = (url, callback) => {
    fetch(url)
      .then(res => {
        // If data fetching failed, throw an error with an error message
        if (!res.ok) {
          throw new Error("Error occurred while trying to fetch the data");
        }
        // If fetching succeeded, return the JSON of the response
        return res.json();
      })
      .then(data => {
        //console.log("location fetch results: ")
        //console.log(data.results)
        callback(data.results, null, false);
      })
      .catch(err => {
        callback( null, err.message, null);
      });
    };

    /**
     * Change handler for location input
     * updates selectedLocationFlag to false to display the location suggestion dropdown
     * sets location input value to content of the input field
     * @param {*} e event
     */
  const handleInputChange = (e) => {
    setSelectedLocation(false);
    setLocation(e.target.value);
  };
  
  const handleInputBlur = (e)=>{
    setSelectedLocation(true)
  }
  /**
   * Click handler for location input
   * clears location input field when clicked
   */
  const handleInputClick = () => {
    //setLocation('');
  };

 const rtCurrentWeather = ()=>{
  setShowForecast(false);
 }



  return (
    <div className="App">
      
      {!showForecast &&
        <>
        <div className="weather">
        <input 
        className="locationInput"
          type="text"
          value={location}
          onChange={handleInputChange}
          onClick={handleInputClick}
          onBlur={handleInputBlur}
          placeholder="Where u @ ?"
        />
        {error && <p>{error.message}</p>}
        {loading ? 
          <p>Loading...</p> : 
          <div>
            {suggestions  && !hideDropDown && <Dropdown setCoords={setCoords} suggestions={suggestions}/>}  
          </div>}

          {location > 0 &&  <p className="debug">{location}</p>}
          {weatherData &&  <CurrentWeather weatherData={weatherData[0]}/>}
      </div>
      
      <div className="navigation">
            <span className="today">Today</span>
            <button className="fiveDays" onClick={()=>{setShowForecast(true)}}>
                5 days  
                <FontAwesomeIcon className="navIcon" icon={faChevronRight}/>
            </button>
        </div>
          {weatherData && <HourlyWeather hourlyWeatherData={hourlyWeatherData}/>}
        </>
        }
          {weatherData && showForecast && <WeatherForecast weatherData={weatherData} returnToCurrentWeather={rtCurrentWeather}/>}
    </div>
  );
}

export default App;
