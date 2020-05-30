import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
    return (
        <h1>{props.course}</h1>
    )
}

const Part = (props) => {
    return (
      <p>{props.part} {props.exercises}</p>
    )
}

const Content = (props) => {
  const parts = props.parts
  const part1 = parts[0].name
  const exercises1 = parts[0].exercises
  const part2 = parts[1].name
  const exercises2 = parts[1].exercises
  const part3 = parts[2].name
  const exercises3 = parts[2].exercises

    return (
        <div>
            <Part part = {part1} exercises = {exercises1}/>
            <Part part = {part2} exercises = {exercises2}/>
            <Part part = {part3} exercises = {exercises3}/>
        </div>
    )
}

const Total = (props) => {
    const total = props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises
    return (
        <p>The total parts are {total}</p>
    )
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  

  return (
    <div>
        <Header course={course.name}/>
        <Content parts = {course.parts} />
        <Total parts={course.parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));