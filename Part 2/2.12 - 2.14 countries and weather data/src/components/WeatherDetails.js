import React, {useState, useEffect} from 'react'
import axios from 'axios'

const WeatherDetails = ({countryCapital}) => {
  const [apiResponse, setApiResponse] = useState({
    weatherTemp:'loading...', weatherIcon:null, windSpeed: 'loading...', windDirection: 'loading...'})
  useEffect (()=>{
    const fetchData = async () => {
      const url = `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${countryCapital}`
      await axios.get(url).then(request => {
        const requestData = request.data
        setApiResponse({
          weatherTemp: requestData.current.temperature,
          weatherIcon: requestData.current.weather_icons[0],
          windSpeed: requestData.current.wind_speed,
          windDirection: requestData.current.wind_dir
        })
      }).catch(e=>{
        setApiResponse({
          windSpeed: 'loading...',
          weatherIcon:null,
          weatherTemp: 'loading...',
          windDirection: 'unable to connect'
        })
      })
    }
    fetchData()
  }, [countryCapital])

  return(
    <div>
      <h3><b>Weather in {countryCapital}</b></h3>
      <p><b>Temperature:</b> {apiResponse.weatherTemp} celsius</p>
      <img src={apiResponse.weatherIcon} alt=""/>
      <p><b>wind:</b> {apiResponse.windSpeed} mph direction {apiResponse.windDirection}</p>
    </div>
  )
}

export default WeatherDetails