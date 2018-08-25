import React from 'react'
import classes from './LetterSpace.css'

const letterSpace = (props) => {
  console.log("[LetterSpace.js] - letter: ", props.letter)
  const letter = props.guessed || !props.wordActive ? props.letter : ' '
  const activeClasses = !props.guessed && !props.wordActive ? [classes.LetterSpace, classes.WordFailed] : [classes.LetterSpace]
  return (
    <div className={activeClasses.join(' ')}>
      {letter}
    </div>
  )
}

export default letterSpace