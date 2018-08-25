import React from 'react'
import classes from './Letter.css'

const letter = (props) => {
  const guessed = props.guessed ? 'classes.Guessed' : null
  return (
    <div className={[classes.Letter, guessed].join(' ')} onClick={() => props.clicked(props.letter)}>
      {props.letter}
    </div>
  )
}

export default letter