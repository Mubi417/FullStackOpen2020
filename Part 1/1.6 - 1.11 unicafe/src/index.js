import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({action, text}) => {
  return (
    <>
    <button onClick={action}>{text}</button>
    </>
  )
}

const Statistic = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}


const Statistics = ({good, neutral, bad, all, average, positive}) => {
  if (all === 0) {
    return (
      <div>
        <h2>Statistics</h2>
        <p>No Feedback given yet</p>
      </div>
    )
  }
  return (
    <div>
        <h2>Statistics</h2>
        <table>
          <tbody>
            <Statistic text="good" value={good}/>
            <Statistic text="neutral" value={neutral}/>
            <Statistic text="bad" value={bad}/>
            <Statistic text="all" value={all}/>
            <Statistic text="average" value={average}/>
            <Statistic text="positive" value={positive + ' %'}/>
          </tbody>
        </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGood = () => setGood(good+1)
  const addNeutral = () => setNeutral(neutral+1)
  const addBad = () => setBad(bad+1)
  let all = good + bad + neutral
  let positive = (good/all) * 100
  let average = (good + (neutral * 0) + (bad * -1))/all

  if (all === 0) {
    positive = 0
    average = 0
  }

  return (
    <div>
      <h2>Give Feedback</h2>
      <div>
          <Button action = { addGood } text="good" />
          <Button action = { addNeutral } text="neutral" />
          <Button action = { addBad } text="bad" />
      </div>
      <Statistics 
        good={good}
        bad={bad}
        neutral={neutral}
        all={all}
        average={average}
        positive={positive}
      />
      
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
