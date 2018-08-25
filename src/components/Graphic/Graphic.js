import React from 'react'
import classes from './Graphic.css'

const graphic = (props) => {
  const sunRays = []
  for (let i = 1; i <= props.incorrectGuesses; i++) {
    const ray = 'SunRay' + i
    const activeClasses = [classes.SunRay, classes[ray]].join(' ')
    sunRays.push(<div className={activeClasses}></div>)
  }

  const snowmanClasses = props.currentWordActive ? classes.Snowman : classes.SnowmanMelted

  return (
  <div className={classes.Graphic}>
    <div className={snowmanClasses}></div>
    <div className={classes.SunBody}></div>
    {sunRays}
  </div>)
}

export default graphic