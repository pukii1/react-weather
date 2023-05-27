import './App.css';
import Dropdown from './components/Dropdown';
import { useState, useEffect } from 'react';
import { debounce } from 'lodash';


function App() {
  //lodash delay time in ms
  const delayTime = 3000;
  //Autocomplete API Key
  const autoAPIKey = "85d1e69a6f9b4e08b4226c0465384f18";
  //weather API key
  const weatherAPIKey = "020fdb36b8b179cde66157d24221cac6";
  //Autocomplete fetch URL
  const autocompleteUrl1 = "https://api.geoapify.com/v1/geocode/autocomplete?text="
  const autoCompleteUrl2 = "&type=city&format=json&apiKey=" + autoAPIKey;
  //weather url
  const [weatherUrl, setWeatherUrl] = useState("");
  //search value
  const [value, setValue] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  //weather data + weather fetch error
  const [weatherError, setWeatherError] = useState(null);
  const [weatherData, setWeatherData] = useState([]);
  //autocomplete suggestions
  const [suggestions, setSuggestions] = useState([]);
  

  //callback to poplate weather data + weather error consts
  const fetchWeatherCallback = (data, error)=>{
    setWeatherData(data);
    setWeatherError(error)
  }
  //trigger weather data fetch once coords change
  useEffect(()=>{
    console.log(`fetching ${weatherUrl}`)
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
      fetchWeatherCallback(data.list[0].main, null);
    })
    .catch(err => {
      fetchWeatherCallback( null, err.message);
    });
  }, [weatherUrl])

  //setting new location coords
  const setCoords = (lat, lon)=>{
    setWeatherUrl(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${weatherAPIKey}`);
    console.log(`setting coords lat:${lat}, lon:${lon}`)
  }

  //fetch callback
  const fetchCallback = (data, error, loading)=> {
    console.log("setting suggestions")
    console.log("data...");
    console.log( loading)
    setSuggestions(data);
    setError(error);
    setLoading(loading);
  }
  useEffect(()=>{
    console.log(suggestions)
  }, [suggestions])

  
  //use lodash to delay fetch trigger to minimize API calls
  //calls useFetch only after user has stopped typing or paused for [delayTime]
  const fetchThis = (url, callback) => {
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

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };
  
  useEffect(() => {
    if(value.length > 0){
      const debouncedFetch = debounce(() => {
        setLoading(true);
        let autocompleteUrl = autocompleteUrl1 + value + autoCompleteUrl2;
        fetchThis(autocompleteUrl, fetchCallback);
      }, delayTime);
    
      debouncedFetch();
    
      return () => {
        debouncedFetch.cancel(); // Cancel the debounced function if the component unmounts or the value changes before the debounce time
      };
    }
   
  }, [value]);



  //converts kelvin to celsius
  const toCelsius = (k)=>{
    return Math.floor(k-273.15)
  }
  return (
    <div className="App">
      <h1>Weather App</h1>
      <input 
        type="text"
        value={value}
        onChange={handleInputChange}
        placeholder="Enter your search"
       />
       {error && <p>{error.message}</p>}
       {loading ? 
        <p>Loading...</p> : 
        <div>
          {suggestions && <Dropdown setCoords={setCoords} suggestions={suggestions}/>}  
        </div>}
        {weatherData && <p>temp max: {toCelsius(weatherData.temp)}°</p>}
    </div>
  );
}

export default App;
