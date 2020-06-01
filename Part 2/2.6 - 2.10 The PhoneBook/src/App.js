import React, { useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

//Hi, Mr Professor Matti Luukkkainen, I hope you don't mind the comments in my work,
// I commented almost everything for future reference when i am reviewing the code so I don't get confused
// This exercise gave me quite some trouble

const App = () => {

  //Declaration of persons state
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', phone: '040-123456' },
    { name: 'Ada Lovelace', phone: '39-44-5323523' },
    { name: 'Dan Abramov', phone: '12-43-234345' },
    { name: 'Mary Poppendieck', phone: '39-23-6423122' }
  ])

  //Declaration of values for onchange States for the forms inputs
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ personsToShow, setPersonsToShow ] = useState([...persons]) //state to determine persons to show based on filter

  //Declaration of events when the input values change
  const nameChange = (e)=>setNewName(e.target.value)
  const phoneChange = (e)=>setNewPhone(e.target.value)

  //Declaration of event for when a new person is added from the form
  const addPerson = (e) => {
    e.preventDefault()
    const personObject = { name: newName, phone: newPhone };//create new person object to add
    const personsName = persons.map((person) => person.name)//extraction of each persons name from the persons object into an array

    if (personsName.includes(personObject.name)){ //condition for if newly created objects name is in already extracted person name
      alert(`${personObject.name} is already added to phonebook`)
    }
    else {
      setPersons(persons.concat(personObject)) //change state of persons to add the new person, might not be useful anymore
      setPersonsToShow(personsToShow.concat(personObject)) //change state of persons to show
    }
  }

  //Event triggered when the filter input changes
  const filterEvent = (e) => {
    const inputValue = e.target.value.toLowerCase() //set all input to lower case
    setFilter(inputValue) //set the filter input value to value in event

    //if filter is empty, show all by copying persons state, a better way might be to eradicate the persons state completely
    //and turn into just a normal array
    if (inputValue===""){ setPersonsToShow([...persons]) }
    else {
      //chanaging state of persons to show based on filter
      setPersonsToShow([...persons].filter(
        person => person.name.toLowerCase().includes(inputValue)
        )
      )
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterChange={filterEvent} filter={filter} /> 
      <h2>Add New Number</h2>
      {// passing the submit event, the input values events to the PersonForm Component
      }
      <PersonForm 
        submit={addPerson}
        nameChange = {nameChange}
        phoneChange = {phoneChange}
        name = {newName}
        phone = {newPhone}
      />
      <h2>Numbers</h2>
      {//pass personstoshow state to person Components
      }
      <Persons person={personsToShow}/>
    </div>
  )
}

export default App