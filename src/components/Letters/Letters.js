import React from 'react'
import Letter from './Letter/Letter'

import classes from './Letters.css'

const letters = (props) => {
  console.log("[Letters.js]")
  const letters = Object.keys(props.letters)
    .map(letter => {
      return <Letter key={letter} letter={letter} guessed={props.letters[letter]} />
    })
  return <div className={classes.Letters}>{letters}</div>
}

export default letters




// letterGuessHandler = (letter) => {
//   let letters = this.state.letters
//   letters = letters.map(el => {
//     if (el.letter === letter) {
//       el.guessed = true
//     }
//     return el
//   })
//   this.setState({letters: letters})
// }