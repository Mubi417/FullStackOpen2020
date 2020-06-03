import React from 'react'

const PersonForm = ({submit, nameChange, phoneChange, name, phone}) => {
  return (
    <form onSubmit={submit}>
      <div>
        name: <input onChange = {nameChange} value={name} required={true} />
      </div>
      <div>number: <input onChange = {phoneChange} value={phone} required={true} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}



export default PersonForm