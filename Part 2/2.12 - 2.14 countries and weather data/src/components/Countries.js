import React , {useState, useEffect} from 'react'
import CountriesDetails from './CountriesDetails'

const Countries = ({countriesList}) => {
  const [countryIndex, setCountryIndex] = useState('');
  useEffect(() => {
    setCountryIndex('')
  },[countriesList])
  const buttonClick = (e) => {
    setCountryIndex(e.target.dataset.index)
  }

  if (countriesList.length === 1) {
    return (<CountriesDetails countryToShow = {countriesList[0]}/>)
  }
  else if (countriesList.length < 1) {
    return(<div><p>No Countries Found</p></div>)
  }
  else if (countriesList.length > 10) {
    return(<div><p>Too many Matches, Specify another filter</p></div>)
  }
  else {
    const countriesToShow = countriesList.map((country)=>country.name)
    return (
      <div>
        {countriesToShow.map((country, n) =>
        (<p key={country}>{country} <button data-index={n} onClick = {buttonClick}>show</button></p>))}
        <CountriesDetails countryToShow = {countriesList[countryIndex]}/>
      </div>
    )
  }
}

export default Countries