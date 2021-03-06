import React from 'react'
import classes from './Graphic.css'
import SpeechBubble from './SpeechBubble/SpeechBubble'

const graphic = (props) => {
  const sunRays = []
  for (let i = 1; i <= props.incorrectGuesses; i++) {
    const ray = 'SunRay' + i
    const activeClasses = [classes.SunRay, classes[ray]].join(' ')
    sunRays.push(<div key={ray} className={activeClasses}></div>)
  }

  const snowmanClasses = props.currentWordActive || props.wordWon ? [classes.Snowman, classes['Snowman' + props.incorrectGuesses]] : [classes.SnowmanMelted]
  const puddleClasses = props.currentWordActive || props.wordWon ? [classes.Puddle, classes['Puddle' + props.incorrectGuesses]] : []
  const guessesRemaining = props.incorrectGuessesAllowed - props.incorrectGuesses

  let message = "I'm a snowman!"
  
  if (props.wordWon) {
    message = "You saved me!" 
  } else if (props.wordLost) {
    message = props.user + ", why..."
  }

  return (
  <div className={classes.Graphic}>
    <div className={classes.SnowmanDiv}>
      <div className={snowmanClasses.join(' ')}>
        <SpeechBubble wordWon={props.wordWon} wordLost={props.wordLost}>{message}</SpeechBubble>
      </div>
    </div>
    <div className={classes.PuddleDiv}>
      <div className={puddleClasses.join(' ')}></div>
    </div>
    <div className={classes.SunBody}>{guessesRemaining}</div>
    {sunRays}
  </div>)
}

export default graphic