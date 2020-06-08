import React, {useState} from 'react';
import axios from 'axios'
import Countries from './components/Countries'

let countries = [];
axios.get('https://restcountries.eu/rest/v2/all').then(
  (response) => {
    countries = response.data
  }
).catch(e =>{
  countries = ['something went wrong']
})


const App = () => {
  const [inputCountry, setInputCountry] = useState('')
  const [shownCountries, setShownCountries] = useState([])

  const countrySearch = (e) => {
    const inputValue = e.target.value
    setInputCountry(inputValue)

    if (inputValue === "") {
      setShownCountries([])
    } else {
      const countriesDetails = countries.filter((country) => country.name.toLowerCase().includes(inputValue.toLowerCase()))
      setShownCountries(countriesDetails)
    }
  }

  return (
    <div>
      find Countries <input value={inputCountry} onChange={countrySearch}/>
      <div>
        <Countries countriesList={shownCountries}/>
      </div>
    </div>
  );
}

export default App;
