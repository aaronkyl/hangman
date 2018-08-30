import React from 'react'
import Letter from './Letter/Letter'

import classes from './Letters.css'

const letters = (props) => {
  const letters = Object.keys(props.letters)
    .map(letter => {
      return (
        <Letter 
          key={letter} 
          letter={letter} 
          guessed={props.letters[letter]} 
          clicked={props.clicked} 
          selectable={props.selectable} />
      )
    })
  return <div className={classes.Letters}>{letters}</div>
}

export default letters
