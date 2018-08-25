import React from 'react'
import LetterSpace from './LetterSpace/LetterSpace'

import classes from './Word.css'

const word = (props) => {
    console.log("[Word.js] - render()")
    const letters = props.letters.map((letter, index) => {
      return <LetterSpace key={index} letter={letter.letter} guessed={letter.guessed} index={index} wordActive={props.wordActive}/>
    })
    return (
      <div className={classes.WordContainingDiv}>
        <div className={classes.Word}>
          {letters}
        </div>
      </div>
      
    )
  }

export default word