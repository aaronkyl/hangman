import React from 'react'
import classes from './Letter.css'

const letter = (props) => {
  const appliedClasses = props.guessed ? [classes.Letter, classes.Guessed] : [classes.Letter]
  return (
    <div className={appliedClasses.join(' ')} onClick={() => props.clicked(props.letter)}>
      {props.letter}
    </div>
  )
}

export default letter