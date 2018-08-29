import React from 'react'
import WordBubble from './WordBubble/WordBubble'
import SmallBubble from './SmallBubble/SmallBubble'
import classes from './SpeechBubble.css'

const speechBubble = (props) => {
  let activeClasses = [classes.SpeechBubble]
  if (props.wordWon) {
    activeClasses.push(classes.Congrats)
  } else if (props.wordLost) {
    activeClasses.push(classes.Defeat)
  }

  return (
    <div className={activeClasses.join(' ')}>
      <WordBubble>{props.children}</WordBubble>
      <SmallBubble bubble={'Bubble1'} />
      <SmallBubble bubble={'Bubble2'} />
    </div>
  )
}

export default speechBubble