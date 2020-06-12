import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import phoneNumbers from './services/phoneNumbers'
import Messages from './components/Messages'


const App = () => {

  const [ persons, setPersons ] = useState([])

  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ personsToShow, setPersonsToShow ] = useState([...persons])
  const [ message, setMessage ] = useState({message: null, error: false})

  const nameChange = (e)=>setNewName(e.target.value)
  const phoneChange = (e)=>setNewPhone(e.target.value)

  const getAllAndSetState =  () => {
    phoneNumbers.getAll().then((data)=>{
    setPersonsToShow(data)
    setPersons(data)
    })
  } //Called to reset default state

  useEffect(() => {
    getAllAndSetState()
  }, [])

  const setAndRemoveMessage = (message, error=false) => {
    setMessage({message: message, error: error})
    setTimeout(()=>{setMessage({message: null, error: false})}, 5000)
  } //set and remove messages after 5 seconds

  const addPerson = (e) => {
    e.preventDefault()
    const personObject = { name: newName, number: newPhone };
    const personsName = persons.map((person) => person.name)

    if (personsName.includes(personObject.name)){
      if (window.confirm(`${personObject.name} is already added to phonebook, replace number?`)) {

        const id = persons.filter((person) => person.name === personObject.name)[0].id

        phoneNumbers.updateOne(id, personObject).then((data)=>{
          setAndRemoveMessage(`${data.name}'s contact has been updated successfully`)
          getAllAndSetState()
        }).catch(()=>{
          setAndRemoveMessage(`${personObject.name} has already been removed from server`, true)
          getAllAndSetState()
        })

      }
    }
    else {

      phoneNumbers.createOne(personObject).then((data) => {
        setAndRemoveMessage(`${data.name}'s contact has been Added`)
        setPersons(persons.concat(data))
        setPersonsToShow(personsToShow.concat(data))
      }).catch(()=>{
        setAndRemoveMessage('An error occured, please try again!!', true)
      })

    }
  }

  const filterEvent = (e) => {
    const inputValue = e.target.value.toLowerCase()
    setFilter(inputValue) //set the filter input value to value in event

    if (inputValue===""){ setPersonsToShow([...persons]) }
    else {
      //chanaging state of persons to show based on filter
      setPersonsToShow([...persons].filter(
        person => person.name.toLowerCase().includes(inputValue)
        )
      )
    }
  }

  const deletePerson = (id) => {
    if (window.confirm("Do you really want to delete this contact?")) { 
      phoneNumbers.deleteOne(id).then(()=>{
        const newPersons = persons.filter((person)=>person.id !== id)
        setAndRemoveMessage('Contact has been deleted')
        setPersons(newPersons)
        setPersonsToShow(newPersons)
      }).catch(e=>{
        setAndRemoveMessage('Contact did not exist on server', true)
        getAllAndSetState()
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Messages message={message}/>
      <Filter filterChange={filterEvent} filter={filter} /> 
      <h2>Add New Number</h2>
      <PersonForm 
        submit={addPerson}
        nameChange = {nameChange}
        phoneChange = {phoneChange}
        name = {newName}
        phone = {newPhone}
      />
      <h2>Numbers</h2>
      <Persons person={personsToShow} remove={deletePerson}/>
    </div>
  )
}

export default App