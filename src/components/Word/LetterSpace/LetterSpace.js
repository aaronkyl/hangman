import React from 'react'
import classes from './LetterSpace.css'

const letterSpace = (props) => {
  console.log("[LetterSpace.js] - letter: ", props.letter)
  let letter = props.guessed ? props.letter : ' '
  return (
    <div className={classes.LetterSpace}>
      {letter}
    </div>
  )
}

export default letterSpace