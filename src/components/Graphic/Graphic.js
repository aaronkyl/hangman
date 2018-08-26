import React from 'react'
import classes from './Graphic.css'

const graphic = (props) => {
  const sunRays = []
  for (let i = 1; i <= props.incorrectGuesses; i++) {
    const ray = 'SunRay' + i
    const activeClasses = [classes.SunRay, classes[ray]].join(' ')
    sunRays.push(<div className={activeClasses}></div>)
  }

  const snowmanClasses = props.currentWordActive || props.wordWon ? classes.Snowman : classes.SnowmanMelted
  const guessesRemaining = props.incorrectGuessesAllowed - props.incorrectGuesses

  return (
  <div className={classes.Graphic}>
    <div className={snowmanClasses}></div>
    <div className={classes.SunBody}>{guessesRemaining}</div>
    {sunRays}
  </div>)
}

export default graphic