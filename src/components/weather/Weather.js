
import React from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faCloud, faCloudSun, faDroplet, faSmoking, faSnowflake, faSun, faWind } from '@fortawesome/free-solid-svg-icons'

import { useEffect } from 'react'
import { useState } from 'react'

export default function Weather() {

    const [userSearch, setUserSearch ] = useState("karachi")
    const [ weatherInfo, setWeatherInfo ] = useState({})
    const [weatherIcon, setWeatherIcon ] = useState("")
    const apiId = "4da56389af39112ca7b0af3179b69f4e"

    const getWeatherInfo = async () => {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${userSearch}&appid=${apiId} `
            let res = await fetch(url)
            let allData = await res.json()
            // disdtructuring.....
            const { temp, humidity, pressure } = allData.main
            const { speed } = allData.wind
            const { country, sunset } = allData.sys
            const { name } = allData
            const { main: weathermood } = allData.weather[0]

            const newWeatherObj = {
                temp,
                humidity,
                pressure,
                speed,
                country,
                sunset,
                name,
                weathermood
            }
            setWeatherInfo(newWeatherObj)




        } catch (error) {
            console.log(error);
        }
    }

    let sec = weatherInfo.sunset
    let date = new Date( sec * 1000 )
    let sunsetTime = `${date.getHours() }:${date.getMinutes()} `

    useEffect(()=>{
        getWeatherInfo()
    },[] )

    useEffect(()=>{
        if(weatherInfo.weathermood){
            switch (weatherInfo.weathermood) {
                case "Clouds":
                    setWeatherIcon(faCloud )
                    break;
                case "Smoke":
                    setWeatherIcon(faSmoking )
                    break;
                case "Clear":
                    setWeatherIcon(faSun )
                    break;
            
                default:
                    setWeatherIcon(faSun )
                    break;
            }
        }
    }, [weatherInfo.weathermood] )

  return (
    <>
    
    <div className="section max-w-lg m-auto">
        <div className="card">
            <div className="search">
                <input type="search" 
                 placeholder="Search your city..."
                 value={userSearch}
                 onChange={(e) => setUserSearch(e.target.value) }
                />
                <button 
                    type='button'
                    onClick={getWeatherInfo} 
                >FIND</button> 
            </div>
            <div className="weathericon bg-blue-300 py-10 px-0 text-center">
              <FontAwesomeIcon className="text-7xl" icon={weatherIcon} /> 
              
               <br /> {weatherInfo.temp}
            </div>
            <div className="weatherinfo flex justify-between">
                <div className="weathertemp">
                      {weatherInfo.weathermood } <br /> {weatherInfo.name },{weatherInfo.country}
                </div>
                <div className="currentdate">
                   { 
                    new Date().toLocaleString()
                    }
                </div>
            </div>
            <div className="weatherupdate flex justify-between">
                <div className="sunset text-xl">
                    <p className="text-3xl"> <FontAwesomeIcon icon={faSun} /> </p> 
                  { sunsetTime} <br />  Sunset
                </div>
                <div className="humidity text-xl ">
                    <p className="text-3xl"> <FontAwesomeIcon icon={faDroplet} /> </p>
                   {weatherInfo.humidity} <br /> Humidity
                </div>
                <div className="pressure text-xl ">
                    <p className="text-3xl"> <FontAwesomeIcon icon={faSnowflake} /> </p>
                  {weatherInfo.pressure} <br /> Pressure
                </div>
                <div className="speed text-xl ">
                    <p className="text-3xl"> <FontAwesomeIcon icon={faWind} /> </p>
                   {weatherInfo.speed} <br /> Speed
                
                </div>
            </div>

        </div>
    </div>
    
    
    
    
    
    
    
    
    </>
  )
}











