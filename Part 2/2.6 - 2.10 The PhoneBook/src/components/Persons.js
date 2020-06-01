import React from 'react'

const Persons = ({person}) => {
  return (
    <>
    { person.map(person =>
      <p key={person.name}>{person.name} {person.phone}</p>
    )}
    </>
  )
}

export default Persons