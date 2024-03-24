import React, { useEffect, useState } from 'react';
import cloud_icon from '../Assets/cloud.png';
import humidity_icon from '../Assets/humidity.png';
import wind_icon from '../Assets/wind.png';
import clear_icon from '../Assets/clear.png';
import drizzle_icon from '../Assets/drizzle.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';
import few_cloudsday_icon from '../Assets/few_clouds(02d).png';
import few_cloudsnight_icon from '../Assets/(02n).png';
import clouds_03d_03n from '../Assets/clouds(03d and 03n).png';
import scattered_clouds from '../Assets/scattered_clouds(04d_04n).png';
import rain_night from '../Assets/010n.png';
import shower_rain from '../Assets/shower_rain(09d_09n).png';
import thunderstorm from '../Assets/thunderstorm(011d_011n).png';
import night_icon from '../Assets/night.png';
import './WeatherApp.css';

function WeatherApp() {

  const [city, setCity] = useState(null);
  const [search, setSearch] = useState("Mathura");
  const [wicon, setWicon] = useState(cloud_icon);

  const fetchApi = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=e3070290f8b23198dfd58be47cc0b62d`;
    const response = await fetch(url);
    const data = await response.json();
    setCity(data.main);

    if (data.weather && data.weather[0] && data.weather[0].icon) {
      const iconCode = data.weather[0].icon;
      if (iconCode === "01d") {
        setWicon(clear_icon);
      }
      else if(iconCode === "01n"){        
        setWicon(night_icon);
      }
      else if(iconCode === "02d"){        
        setWicon(few_cloudsday_icon);
      }
      else if(iconCode === "02n"){        
        setWicon(few_cloudsnight_icon);
      }
      else if(iconCode === "03d" || iconCode === "03n"){        
        setWicon(clouds_03d_03n);
      }
      else if(iconCode === "04d" || iconCode === "04n"){        
        setWicon(scattered_clouds);
      }
      else if(iconCode === "09d" || iconCode === "09n"){        
        setWicon(shower_rain);
      }
      else if(iconCode === "010d"){        
        setWicon(rain_icon);
      }
      else if(iconCode === "010n"){        
        setWicon(rain_night);
      }
      else if (iconCode === "11d" || iconCode === "11n") {
        setWicon(thunderstorm);
      }
      else if (iconCode === "13d" || iconCode === "13n") {
           setWicon(snow_icon);
      }
      else {
           setWicon(drizzle_icon);
       }
    }
  };

  useEffect(() => {
    fetchApi();
  },[search]);

  return (
    <>
      <div className="container">
        <div className="row text-md-center text-center-0">
          <div className="col-12">
        <div className="top-bar">
          <input type="text" className='cityInput' autoFocus value={search} placeholder='Search' onChange={(event) => {
            setSearch(event.target.value);
          }} />
        </div>

        {!city ? (
          <p className='text-white text-center fw-semi-bold mt-5 fs-4'>No Data Found</p>
        ) : (
          <>
            <div className="weather-image">
              <img src={wicon} alt=".." width="180px" />
            </div>
            <div className="weather-temp text-white">{city.temp}&#x2103;</div>
            <div className="weather-location text-white">{search}</div>
            <p className='temp-max text-white text-center'>Min : {city.temp_min}&#x2103;  |  Max : {city.temp_max}&#x2103;</p>
            <div className="data-container">
              <div className="element">
                <img src={humidity_icon} alt=".." className='icon' width="40px" height="30px" />
                <div className="data">
                  <div className="humidity-percent text-white">{city.humidity} %</div>
                  <div className="text text-white">Humidity</div>
                </div>
              </div>

              <div className="element">
                <img src={wind_icon} alt=".." className='icon' width="40px" height="30px" />
                <div className="data">
                  <div className="humidity-percent text-white">{city.pressure}&nbsp;N/m&sup2;</div>
                  <div className="text text-white">Pressure</div>
                </div>
              </div>
            </div>
          </>
        )}
        </div>
        </div>
      </div>
    </>
  )
}

export default WeatherApp;
