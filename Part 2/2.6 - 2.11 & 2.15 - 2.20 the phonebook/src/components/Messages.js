import React from 'react'
import './Message.css'


const Messages = ({message}) => {

  if (message.message == null) {
    return(null)
  }

  let style = {}
  if (message.error) {
    style = {
      color: 'red',
      borderColor: 'red'
    }
  }
 
  return (
    <div className="message" style={style}>{message.message}</div>
  )
}

export default Messages