import React from 'react'

const Header = ({ course }) => {

    return ( <h1>{course.name}</h1> )
}

const Total = ({ course }) => {

    const sum = course.parts.map(parts => parts.exercises).reduce(( i , j ) => i + j)

    return( <p><b>Total of {sum} exercises</b></p> )

}

const Part = (props) => {

    return ( <p>{props.part.name} {props.part.exercises}</p> )
}

const Content = ({ course }) => {

    return (
        <div>
            {course.parts.map(
                (parts => <Part key={parts.id} part={parts} />)
            )}
        </div>
    )
}

const Course =({course}) => {

    return (
        <div>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
        </div>
    )
}

export default Course