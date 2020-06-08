import React from 'react'
import WeatherDetails from './WeatherDetails'

const CountriesDetails = ({countryToShow}) => {
  if (countryToShow === undefined) {
    return (null)
  }

  return(
    <div>
      <div>
        <h2><b>{countryToShow.name}</b></h2>
        <p>Capital: {countryToShow.capital}</p>
        <p>Population: {countryToShow.population}</p>
        <p><b>Languages</b></p>
        <ul>
          {countryToShow.languages.map((lang)=> {
            return (<li key={lang.name}>{lang.name}</li>)
          })}
        </ul>
        <img src={countryToShow.flag} alt={`${countryToShow.name}'s flag`} height="75px"/>
      </div>
      <WeatherDetails countryCapital = {countryToShow.capital}/>
    </div>
  )
}


export default CountriesDetails