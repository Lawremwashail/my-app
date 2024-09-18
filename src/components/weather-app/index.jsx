import {useEffect, useState} from 'react';
import Search from "../weather-app-search";

export default function Weather() {
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [weatherData, setWeatherData] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [localTime, setLocalTime] = useState("");

    async function fetchWeatherApi(location) {
        setLoading(true);
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=a5b289349d0e5f9ad1fc40b97d4b6df8`);
            const data = await response.json()

            if (data) {
                setWeatherData(data);
                calculateLocalTime(data.timezone);
                setLoading(false);
            }

            console.log(data);
        } catch(e) {            
            setErrorMsg(e.message);
            setLoading(false);
        }
    }
    function getCurrentDate() {
        return new Date().toLocaleDateString('en-us', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        })
    }

    function calculateLocalTime(timezoneOffset) {

        const updateLocalTime = () => {
            const utcTime = new Date().getTime() + new Date().getTimezoneOffset() * 60000;
            const cityTime = new Date(utcTime + timezoneOffset * 1000);
            const formattedTime = cityTime.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            });
            setLocalTime(formattedTime);
        }
        updateLocalTime()

        const intervalId = setInterval(updateLocalTime, 1000);

        return () => {
            clearInterval(intervalId);
        }
    }

    function handleSearch() {
        fetchWeatherApi(search)
    }

    
    useEffect(()=> {
        fetchWeatherApi("Nairobi")
    }, []);
    
    if (errorMsg !== null) {
        return <div className='error-msg'>No Match Found, {errorMsg}</div>
    }
    return <div>
        <Search
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
        />
        {
            loading ? <div className='loading'>Loading...</div> : 
            <div>
                <div className='city-name'>
                    <h3>{weatherData?.name}, <span>{weatherData?.sys?.country}</span></h3>
                </div>
                <div className='date' >
                    <span>{getCurrentDate()}</span><br/><br/>
                    <span>Local Time: {localTime}</span>
                </div>
                <div className='weather-description'>
                    <h4>Temperature: {(weatherData?.main?.temp - 273.15).toFixed(2)}°C</h4>
                    <p><strong>{weatherData && weatherData?.weather && weatherData?.weather[0] ? weatherData.weather[0].description : ''}</strong></p>
                </div>
                <div className='weather-info'>
                    <div className='column'>
                        <div>
                            <p>Wind Speed</p>
                            <p>{weatherData?.wind?.speed}</p>
                        </div>                        
                    </div>
                    <div className='column'>
                        <div>
                        <p>Humidity</p>
                        <p>{weatherData?.main?.humidity}%</p>
                        </div>                        
                    </div>
                </div>
            </div>
        }
    </div>
}