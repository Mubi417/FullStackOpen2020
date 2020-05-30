import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Anecdote = ({anecdote, votes}) =>  (<p>{anecdote} <br/> has {votes} votes</p>)

const Button = ({onClick, text}) => (<button onClick={onClick}>{text}</button>)

const App = ({anecdotes}) => {

  const anecdotesLength = anecdotes.length
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotesLength).fill(0))

  const generateAnecdote = () => {
    const randomNumber = Math.round(Math.random()*(anecdotesLength-1))
    console.log(randomNumber)
    setSelected(randomNumber)
  }

  const addAnecdotesVotes = () => {
    let votesCopy = [...votes]
    votesCopy[selected]+=1
    setVotes(votesCopy)
  }

  let highestVotesIndex = votes.indexOf(Math.max(...votes))


  return (
    <div>
      <h2>Anecdote of the day</h2>
      <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]} />
      <Button onClick={addAnecdotesVotes} text='Vote' />
      <Button onClick={generateAnecdote} text ='next anecdotes' />
      <div>
        <h2>Anecdote with most votes</h2>
        <Anecdote anecdote={anecdotes[highestVotesIndex]} votes ={votes[highestVotesIndex]} />
      </div>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)