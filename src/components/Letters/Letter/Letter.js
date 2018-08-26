import React from 'react'
import classes from './Letter.css'

const letter = (props) => {
  const letterActive = !props.guessed && props.selectable
  const appliedClasses = props.guessed ? [classes.Letter, classes.Guessed] : [classes.Letter]
  const clickFunction = letterActive ? () => props.clicked(props.letter) : null
  
  return (
    <div className={appliedClasses.join(' ')} onClick={clickFunction}>
      {props.letter}
    </div>
  )
}

export default letter