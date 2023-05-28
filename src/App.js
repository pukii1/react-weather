import './App.css';
import Dropdown from './components/Dropdown';
import CurrentWeather from './components/CurrentWeather';
import { useState, useEffect } from 'react';
import { debounce } from 'lodash';


function App() {
  //lodash delay time in ms
  const delayTime = 3000;
  //flag denoting if a location has been selected from the dropdown suggestions
  const [selectedLocation, setSelectedLocation] = useState(false);
  //Autocomplete fetch URL
  const [autoUrl, setAutoUrl] = useState("");
  //Autocomplete API Key
  const autoAPIKey = "85d1e69a6f9b4e08b4226c0465384f18";
  //weather API key
  const weatherAPIKey = "020fdb36b8b179cde66157d24221cac6";
  const defaultLat = "53.550341";
  const defaultLon = "10.000654";
  //default weather fetch url
  const defaultWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${defaultLat}&lon=${defaultLon}&appid=${weatherAPIKey}`
  //weather url
  const [weatherUrl, setWeatherUrl] = useState("");
  //search value
  const [location, setLocation] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  //weather data + weather fetch error
  const [weatherError, setWeatherError] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  //autocomplete suggestions
  const [suggestions, setSuggestions] = useState([]);
  

  /**
   * callback to poplate weather data + weather error consts
   * @param {*} data data received from the weather fetch 
   * @param {*} error potential error received from the weather fetch
   */
  const fetchWeatherCallback = (data, error)=>{
    setWeatherData(data);
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
    console.log("default fetching weather")
    fetchWeather(defaultWeatherUrl, weatherFetchCallback)
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
  const setCoords = (city, country_code,lat, lon)=>{
    //update input value to display selected location
    setLocation(`${city}, ${country_code}`)
    setSelectedLocation(true);
    //put locations coords into weather fetch url
    setWeatherUrl(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${weatherAPIKey}`);
    console.log(`setting coords lat:${lat}, lon:${lon}`)
  }

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
      console.log("fetching weather data")
      console.log(data)
      fetchWeatherCallback(data.list[0], null);
    })
    .catch(err => {
      fetchWeatherCallback( null, err.message);
    });
  
  }
  
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
        console.log(data.results)
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
  
  /**
   * Click handler for location input
   * clears location input field when clicked
   */
  const handleInputClick = () => {
    setLocation('');
  };

 



  return (
    <div className="App">
      <input 
      className="locationInput"
        type="text"
        value={location}
        onChange={handleInputChange}
        onClick={handleInputClick}
        placeholder="Where u @ ?"
       />
       {error && <p>{error.message}</p>}
       {loading ? 
        <p>Loading...</p> : 
        <div>
          {suggestions && !selectedLocation && <Dropdown setCoords={setCoords} suggestions={suggestions}/>}  
        </div>}
        <p className="debug">Hamburg</p>
        {weatherData && <CurrentWeather weatherData={weatherData}/>}
    </div>
  );
}

export default App;
