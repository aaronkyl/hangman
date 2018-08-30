import React from 'react'
import classes from './Letter.css'

const letter = (props) => {
  const letterActive = !props.guessed && props.selectable
  const appliedClasses = props.guessed ? [classes.Letter, classes.Guessed] : [classes.Letter]
  if (props.guessed) {
    if (props.inWord) {appliedClasses.push(classes.InWord)}
    else {appliedClasses.push(classes.NotInWord)}
  }
  const clickFunction = letterActive ? () => props.clicked(props.letter) : null
  
  return (
    <div className={appliedClasses.join(' ')} onClick={clickFunction}>
      {props.letter}
    </div>
  )
}

export default letter