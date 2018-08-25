import React from 'react'
import classes from './Graphic.css'

const graphic = (props) => {
  const sunRays = []
  for (let i = 0; i < props.playerIncorrectGuesses; i++) {
    sunRays.push()
  }

  return (
  <div className={classes.Graphic}>
    <div className={classes.SunBody}></div>
    <div className={[classes.SunRay, classes.SunRay1].join(' ')}></div>
  </div>)
}

export default graphic