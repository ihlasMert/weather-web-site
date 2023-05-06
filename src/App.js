import React, { useState } from "react"
import Search from "./components/search/Search"
import "./App.css"
import CurrentWeather from "./components/current-weather/CurrentWeather"
import { WEATHER_API_URL, WEATHER_API_KEY } from "./components/search/api"
import Forecast from "./components/forecast/Forecast"

const App = () => {
  const [currentWeather, setCurrentWeahter] = useState(null)
  const [forecast, setForecast] = useState(null)

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ")
    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    )
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    )
    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json()
        const forecastFetch = await response[1].json()
        setCurrentWeahter({ city: searchData.label, ...weatherResponse })
        setForecast({ city: searchData.label, ...forecastFetch })
      })
      .catch((err) => console.log(err))
  }
  console.log(currentWeather)
  console.log(forecast)
  return (
    <div className='container'>
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast}/>}
    </div>
  )
}
export default App

/*           */
