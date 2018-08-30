import React from 'react'
import LetterSpace from './LetterSpace/LetterSpace'

import classes from './Word.css'

const word = (props) => {
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