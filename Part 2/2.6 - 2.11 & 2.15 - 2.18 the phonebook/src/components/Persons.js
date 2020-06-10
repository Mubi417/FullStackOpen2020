import React from 'react'

const Persons = ({person, remove}) => {
  return (
    <>
    { person.map(person =>
      <p key={person.id}>{person.name} {person.number}
      <button onClick={()=>remove(person.id)}>delete</button></p>
    )}
    </>
  )
}

export default Persons